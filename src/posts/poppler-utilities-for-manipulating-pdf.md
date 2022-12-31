---
title: Poppler Utilities for Manipulating PDF
publishDate: 2022-12-31
---

I've just realized that [Poppler](https://poppler.freedesktop.org/) has command line utilities and they are perfect for manipulating PDF files.

I was trying to extract a few pages from various PDF documents and combine them into a single file for easier double-sided printing. I had used [PDFtk](https://www.pdflabs.com/tools/pdftk-the-pdf-toolkit/) before, so I typed in `pdf` hoping that the shell autocompletion can remind me what the executable is. Several candidates popped out without anything that looked like PDFtk. However, I noticed one named `pdfseparate`. Looking at its help information, apparently, it's part of the Poppler library. I've always considered Poppler as a PDF generation library due to my usage of PDFLaTex, but now I see that it has command line utilities as well. It's a pleasant surprise that the utilities are very easy to use.

For example, I used the following command to extract the second page from a PDF document. Note that `-f` and `-l` indicate first and last pages to extract, inclusively.

```bash
pdfseparate -f 2 -l 2 input.pdf output.pdf
```

Similarly, I used the following command to combine the extracted pages into a single PDF file:

```bash
pdfunite input1.pdf input2.pdf input3.pdf output.pdf
```

Later, I found a [wiki page](https://en.wikipedia.org/wiki/Poppler_(software)#poppler-utils) for brief descriptions on all the Poppler utilities.

I wish that I had known this earlier, but better late than never.
