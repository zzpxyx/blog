function initOnLoad() {
    document.addEventListener('DOMContentLoaded', function() {
        var anchorList = document.getElementsByTagName('a');
        var lastAnchor = anchorList[anchorList.length - 1];
        lastAnchor.addEventListener('click', function() {
            if (document.getElementsByName('show_email').length == 0) {
                var iframe = document.createElement('iframe');
                iframe.width = '700px';
                iframe.height = '350px';
                iframe.name = 'show_email';
                iframe.style = 'border: 1px solid #808080; display: block;';
                lastAnchor.target = iframe.name;
                document.body.appendChild(iframe);
            }
        });
    })
}
