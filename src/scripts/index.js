function initOnLoad() {
    document.addEventListener('DOMContentLoaded', function() {
        var anchorList = document.getElementsByTagName('a');
        var lastAnchor = anchorList[anchorList.length - 1];
        var URL = lastAnchor.href;
        var iframe = document.createElement('iframe');
        iframe.width = '700px';
        iframe.height = '350px';
        iframe.name = 'show_email';
        iframe.style = 'display: none;';
        document.body.appendChild(iframe);
        lastAnchor.target = iframe.name;
        lastAnchor.addEventListener('click', function() {
            iframe.style = 'border: 1px solid #808080; display: block;';
        });
    })
}
