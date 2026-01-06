var shadowBack = 0;
// Debug: fake delay for spinner testing (ms). Set to 0 to disable.
const DEBUG_DELAY_MS = 0;

document.querySelector(".enter-box").addEventListener("click", function () {
  linkGenerate();
});

document.querySelector(".qr-image").addEventListener("click", function () {
  $(".qr-image").addClass("not-clickable");
  var imageBigg = $(".qr-image").hasClass("image100x100");

  if (imageBigg === false) {
    if ($(".qr-link").hasClass("invisible") === false) {
      $(".qr-link").fadeOut(200);
    }
    $(".download-btn").fadeOut(200);

    setTimeout(() => {
      $(".qr-image").addClass("image100x100");
    }, 200);
  }

  if (imageBigg === true) {
    setTimeout(() => {
      if ($(".qr-link").hasClass("invisible") === false) {
        $(".qr-link").fadeIn(200);
      }
      if ($(".qr-link").hasClass("invisible") === true) {
        linkGenerate();
      }
      $(".download-btn").fadeIn(200);
    }, 200);

    $(".qr-image").removeClass("image100x100");
  }

  setTimeout(() => {
    $(".qr-image").removeClass("not-clickable");
  }, 200);
});

$(document).on("keydown", function (event) {
  console.log(event.key);
  var shadow = $(".text-box").hasClass("shadow");
  var popover = $(".popover").css("display");

  if (event.key === "Enter" && popover === "none") {
    document.querySelector(".enter-box").click();
    if (shadow === true) {
      $(".text-box").removeClass("shadow");
      shadowBack++;
    } else {
      shadowBack = 0;
    }
  }
  if (event.key === "Enter" && popover === "block") {
    document.querySelector(".download-btn").click();
  }
  if (event.key === "Escape" && popover === "block") {
    document.querySelector(".enter-box").click();
    if (shadowBack >= 1) {
      $(".text-box").addClass("shadow");
      shadowBack = 0;
    }
  }
  console.log("shadow: " + shadowBack);
});

function linkGenerate() {
  var url1 = document.querySelector(".not-editable-text").value;
  var url2 = document.querySelector(".editable-text").value;
  var url = url1 + url2;
  var linkLength = url2.length;
  var imageBig = $(".qr-image").hasClass("image100x100");

  if (linkLength === 0) {
    $(".qr-link").addClass("invisible");
  }
  if (linkLength >= 40) {
    var urLink = url2.slice(0, 40);
    if (imageBig === false) {
      $(".qr-link").removeClass("invisible");
    }
    $(".qr-link").text(urLink + " ...");
  }
  if (linkLength < 40 && linkLength > 0) {
    if (imageBig === false) {
      $(".qr-link").removeClass("invisible");
    }
    $(".qr-link").text(url2);
  }

  $(".qr-link").attr("href", url);

  console.log(linkLength);
  console.log(url);

  // Generate QR client-side using QRCode library (static GitHub Pages)
  const $qrImg = $(".qr-image");
  const $loader = $(".qr-loader");
  const $download = $(".download-btn");

  $qrImg.off("load error");

  if (
    linkLength > 0 &&
    typeof QRCode !== "undefined" &&
    typeof QRCode.toDataURL === "function"
  ) {
    $loader.removeClass("invisible");
    $download.addClass("not-clickable").css("opacity", 0.6);

    QRCode.toDataURL(
      url,
      { margin: 1, errorCorrectionLevel: "M", width: 512 },
      function (err, dataUrl) {
        if (err) {
          console.error("QR generation error:", err);
          $loader.addClass("invisible");
          $qrImg.attr("src", "./qr_img.png");
          $download
            .attr("href", "./qr_img.png")
            .attr("download", "./qr_img.png")
            .removeClass("not-clickable")
            .css("opacity", 1);
          return;
        }

        setTimeout(function () {
          $qrImg.on("load", function () {
            $loader.addClass("invisible");
            $download.removeClass("not-clickable").css("opacity", 1);
            $download.attr("href", dataUrl).attr("download", "qr.png");
          });
          $qrImg.attr("src", dataUrl);
        }, DEBUG_DELAY_MS || 0);
      }
    );
  } else {
    $qrImg.attr("src", "./qr_img.png");
    $download
      .attr("href", "./qr_img.png")
      .attr("download", "./qr_img.png")
      .removeClass("not-clickable")
      .css("opacity", 1);
    $loader.addClass("invisible");
  }
}

$(".editable-text").on("focus", function () {
  $(".text-box").addClass("shadow");
});

$(".editable-text").on("focusout", function () {
  $(".text-box").removeClass("shadow");
});
