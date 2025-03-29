function showLoading() {
    document.getElementById("loading-screen").style.display = "flex";
}

function hideLoading() {
    setTimeout(() => {
        document.getElementById("loading-screen").style.display = "none";
    }, 500)
}