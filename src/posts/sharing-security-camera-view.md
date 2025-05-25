---
title: Sharing Security Camera View
publishDate: 2024-03-23
updateDate: 2025-05-25
---

I'm on my journey of finding the best way of sharing a security camera view. I have an acceptable solution at the moment.

### Problem

The core problem I'm faced with is very simple. I want to view my security camera from anywhere, and I would like to share the view with a small group of people. There are some restrictions though. First, privacy is of the utmost importance. Second, anywhere really means around the globe. The implication is that VPNs may not work well and certain mobile apps may not be available. Third, ease of use and maintainability is a key factor, so vendor lock-in should be avoided.

After some trail and error, I couldn't find a way to share the live view of the security camera. Instead, I could share recordings that approximate a live view in a real time fashion. Here is what I did.

### Step 1: Set up Security Camera

Find a good security camera and set it up properly. One key feature is supporting the ONVIF specification, or at least the camera is able to stream via the RTSP protocol. Nowadays, security cameras often need the internet access and require mobile apps for the initial setup, so another key feature for the security camera is to be able to work without the internet access after the initial setup. I'd like to isolate the security camera to minimize the risk. My router doesn't have the virtual LAN functionality, so the best I could do was to put the security camera by itself on the 2.4 GHz band WiFi, used a different password between the 2.4 GHz and the 5 GHz bands, and set up firewall in the router to ban all incoming and outgoing traffic for the security camera.

### Step 2: Enable RTSP Streaming

Enable the RTSP streaming on the security camera. Usually, this is done in the companion mobile app for the security camera, and it requires setting up a username and a password. The URL to the RTSP stream also varies according to security camera models. In the unfortunate case that it is not documented, the URL can usually be found through the ONVIF specification. Here is one [example](https://superuser.com/a/1711576). Granted, the mobile app for the security camera already shows the live view. The setup here is mostly for the next step, but it also enables watching the live view on third-party open source applications. For example, on VLC, I can use the "Open Network Stream" option, and use the URL `rtsp://<user>:<pw>@<camera_ip>:<port>/path/to/stream`. I can even use [FFplay](https://ffmpeg.org/ffplay.html) in the same sense as shown below. More discussions on the command line parameters later.

```bash
ffplay -i 'rtsp://<user>:<pw>@<camera_ip>:<port>/path/to/stream'
```

### Step 3: Set up Computing Device

Find a computing device. Mine is the old Android phone in [my previous post](/posts/repurposing-an-old-android-phone/). A Raspberry Pi or the like is perfectly fine. A home lab or a home server also works. The key point here is to find a device that can run all day every day, and supports [FFmpeg](https://ffmpeg.org/), [Rclone](https://rclone.org/), and [inotify-tools](https://github.com/inotify-tools/inotify-tools). Technically, `inotify-tools` can be replaced by other similar tools. See Step 5 for further details.

### Step 4: Set up Cloud Storage

Finding the right cloud storage provider is a non-trivial task. On one hand, all security camera recordings will go there; on the other hand, it should be available to the small group of people so that I can share the uploaded recording files to them. Self-hosting may be a viable solution, but for now I'll just use a common one. I set up the access to the cloud storage via Rclone's `rclone config` command, which started a nice interactive configuration session.

### Step 5: Monitor File System Events

Monitor file system events to upload recording files when they are ready. I'm pleasantly surprised to see `inotify-tools` in Termux packages, even for Android 6. Here is the command I use to monitor the folder `<watch_folder>` which will contain the recording files.

```bash
inotifywait --monitor --event close_write <watch_folder> |
  while read path event file; do
    rclone moveto --no-traverse $path$file <remote>:<folder>/${file:0:8}/${file:9:2}/$file;
  done &
```

It basically says that whenever a recording file is finished writing, use Rclone to move the file from local to the remote cloud storage. The `--no-traverse` option is just a small optimization since I'm moving only one file and I don't need to list out the remote files. Due to the shell parameter expansion, a local file like `20240323T102000-0500.mp4` will be put under `<folder>/20240323/10/20240323T102000-0500.mp4` on the remote. Essentially, I'm organizing the recording files into dates and then hours.

A few comments about `inotify-tools`. It is mostly a Linux tool, so alternatives are needed on other platforms. Here is one [example](https://github.com/nowsecure/fsmon), but I haven't used it myself.

### Step 6: Set up Recording

Finally, set up the actual recording. I use FFmpeg to record the secondary low-resolution RTSP stream from the security camera. The command line parameters are tweaked in a way that the recording will be in 5-minute chunks. Below is the command I use. Note that I execute this command under the `<watch_folder>` as mentioned in Step 5.

```bash
ffmpeg \
  -nostdin \
  -hide_banner \
  -nostats \
  -loglevel error \
  -i 'rtsp://<user>:<pw>@<camera_ip>:<port>/path/to/low/resolution/stream' \
  -map 0 \
  -vcodec copy \
  -acodec aac \
  -b:a 48k \
  -f segment \
  -segment_time 300 \
  -segment_atclocktime 1 \
  -segment_format mp4 \
  -reset_timestamps 1 \
  -strftime 1 \
  %Y%m%dT%H%M%S%z.mp4 &
```

[FFmpeg documentation](https://ffmpeg.org/ffmpeg.html) has the description for all the parameters. Here I'll try to briefly explain what is going on from an FFmpeg newbie's perspective.

- `-nostdin`: Turn off the standard input so that FFmpeg can run as a background job.
- `-hide_banner`: Turn off printing the banner which includes FFmpeg build options and versions of its internal libraries.
- `-nostats`: Turn off the progress report. The progress report is supposed to constantly refresh on the same line, but for some reason it doesn't work on my old Android phone. Instead, it outputs a new line ever time it refreshes.
- `-loglevel error`: Set log level to error. In my setup, I constantly get the warning about non-monotonous DTS, but I couldn't find a way to resolve it.
- `-i ...`: The input file for FFmpeg. Here I'm using the RTSP stream as the input file.
- `-map 0`: Map all streams (video, audio, and technically subtitle) from the input file to the output file.
- `-vcodec copy`: Copy the video stream from input to output as opposed to decoding and encoding it. This saves a lot of CPU power.
- `-acodec aac`: Use AAC when encoding the audio stream. I cannot use `copy` as in the `-vcodec` option because the audio stream is encoded in PCM (`pcm_alaw`) and FFmpeg doesn't support it in the MP4 format.
- `-b:a 48k`: Set the audio bit rate to 48 kb/s. This is just to make a warning about "too many bits per frame requested" go away in my setup.
- `-f segment`: Use segments in output.
- `-segment_time 300`: Each segment is 300 seconds, i.e. 5 minutes.
- `-segment_atclocktime 1`: Start a new segment at clock time. Combined with the segment time above, it means that a new segment will be started at 00:00, 00:05, 00:10, etc.
- `-segment_format mp4`: Use MP4 as the segment format.
- `-reset_timestamp 1`: Reset the timestamp at the beginning of each segment. I find that SMPlayer doesn't play the segment files well without this.
- `-strftime 1`: Enable the `strftime()` format in the output file names.
- `%Y%m%dT%H%M%S%z.mp4`: My custom output file names. The result is like `20240323T102000-0500.mp4`.

### Put It Together

Combined all the above, the end result is like this. I can watch the security camera's live view on any platform when I'm at home. A recording file created at time `T` will contain the security camera footage between `T` and `T+5min`, and it will be uploaded to the cloud storage several seconds after `T+5min`. I can share those files to the small group of people. From their point of view, they are viewing a chunked but real time stream with a 5-minute delay. I can also enable VPN on my router to watch the live view when I'm out somewhere. The recording files on the cloud are also useful for checking out what happened back in time. When everything runs smoothly, the computing device won't hold any recording file for a long period of time.

### Limitations

Last but not the least, my setup does have some limitations and known issues. I have to manually delete the recording files on the cloud storage for the time being. I just haven't had the chance to write another script or cron job to do that automatically. Also, there was one time in the past several months where the Termux process just exited abruptly without any trace, causing several hours of down time for the entire setup until I restarted it. After that incident, I let Termux to acquire the wake lock, and I haven't seen the issue since then. All in all, I find my setup to be an acceptable solution for now.

---

**Updates on 2024-07-05:** I've done some troubleshooting for the known issues and new issues found over the past few months. I've updated this post and here is a quick change log.

1. Remove the `-rtsp_transport tcp` argument for the FFmpeg command. I needed it previously, but now I'm seeing lags in the recordings. Getting rid of it fixed the issue. The issue might be due to a firmware upgrade on the security camera.
2. Use `inotify-tools` instead of a cron job. I didn't expect to see `inotify-tools` on Termux for Android 6. My previous approach will upload premature files containing only the 48-byte MP4 header due to a race condition. Glad that I checked `inotify-tools` this time.
3. And of course, fix a critical typo in one of the parameter names for the FFmpeg command.

---

**Updates on 2025-05-25:** See [this post](/posts/rclone-in-termux-on-android-6/) on lessons learned for running Rclone in Termux on Android 6.
