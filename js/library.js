
function Init(baseUrl, routeUrl) {

    var path, href;
    href = window.location.href;
    path = href.replace(baseUrl, "");
    window.baseUrl = baseUrl;
    routeAction(routeUrl, path);
    let routeLink = Array.from(document.querySelectorAll('[route-link ]'));

    routeLink.forEach(element => {
        element.onclick = function (e) {
            routeAction(routeUrl, element.attributes[0].value);
            e.preventDefault();
        }
    });


}

function routeAction(routeUrl, path) {
    let urlCheck = routeUrl.filter((r) => { return (r.path == path) ? r : false; });
    if (urlCheck.length) {
        route(urlCheck[0].title, path, urlCheck[0].view, 'container');
    }
    else {
        route("Page Not Found", path,  "404", 'container');
    }
}
function route(title, path, View, target) {
    if (typeof (history.pushState) != "undefined") {

        var url = window.baseUrl + path;
        var obj = { Title: title, Url: url };
        renderView(View, target);

        history.pushState(obj, 'obj.View', obj.Url);

    } else {
        alert("Browser does not support HTML5.");
    }
}
function renderView(View, target) {

    if (window[View] ) {

        document.getElementById(target).innerHTML = window[View]();
    }
    else {
        document.getElementById(target).innerHTML = "404";
    }
}