document.addEventListener("DOMContentLoaded", () => {
  // IMAGE OVERLAY
  const imgOverlay = document.getElementById("overlay");
  const overlayImg = document.getElementById("overlay-img");
  const imgCaption = document.getElementById("overlay-caption");

  if (imgOverlay && overlayImg) {
    function showImage(src, captionText) {
      overlayImg.src = src;
      if (imgCaption) imgCaption.textContent = captionText || "";
      imgOverlay.style.display = "flex";
    }

    document.querySelectorAll(".overlay-image").forEach((img) => {
      img.style.cursor = "pointer";
      img.addEventListener("click", () => {
        showImage(img.src, img.dataset.caption);
      });
    });

    imgOverlay.addEventListener("click", () => {
      imgOverlay.style.display = "none";
      overlayImg.src = "";
      if (imgCaption) imgCaption.textContent = "";
    });
  }


  // VIDEO OVERLAY
  const videoOverlay = document.getElementById("video-overlay");
  const video = document.getElementById("overlay-video");
  const videoCaption = document.getElementById("video-caption");

  if (videoOverlay && video) {
    function openVideo(src, captionText) {
      video.src = src;
      if (videoCaption) videoCaption.textContent = captionText || "";
      videoOverlay.style.display = "flex";
      video.play();
    }

    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("video-thumb")) {
        const src = e.target.dataset.src || e.target.src;
        const captionText = e.target.dataset.caption;
        openVideo(src, captionText);
      }
    });

    videoOverlay.addEventListener("click", () => {
      videoOverlay.style.display = "none";
      video.pause();
      video.src = "";
      if (videoCaption) videoCaption.textContent = "";
    });

    video.addEventListener("click", (e) => e.stopPropagation());
  }


  // ESC KEY CLOSE
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (imgOverlay) imgOverlay.style.display = "none";
      if (videoOverlay) {
        videoOverlay.style.display = "none";
        if (video) video.pause();
      }
    }
  });
});