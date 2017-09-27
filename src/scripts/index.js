(function initOnLoad() {
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
                iframe.addEventListener('load', function() {
                    var html = document.documentElement;
                    var body = document.body;
                    var distance = 400;
                    var stride;
                    window.setTimeout(function scroll() {
                        if (distance > 0) {
                            stride = 100 * (distance / 400) * (distance / 400);
                            if (stride < 1) {
                                stride = 1;
                            }
                            html.scrollTop += stride;
                            body.scrollTop += stride;
                            distance -= stride;
                            window.setTimeout(scroll, 20);
                        }
                    }, 20);
                });
                document.body.appendChild(iframe);
                lastAnchor.target = iframe.name;
            }
        });
    });
})();
