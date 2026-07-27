/* =========================================================================
   Local Body popup — built like the Services popup.
   Home view: category headers (Panchayat / Post Office / Health Centre),
   each with a grid of clickable office cards. Click a card -> office details.
   Reads window.VILLAGE_LOCALBODY. Reuses the Services popup styles.
   ========================================================================= */
(function () {
  "use strict";

  var DATA = window.VILLAGE_LOCALBODY;
  var modal = document.getElementById("localbody-modal");
  var views = document.getElementById("localbody-views");
  if (!DATA || !modal || !views) return;

  function esc(t) {
    return String(t == null ? "" : t).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function itemById(id) {
    for (var i = 0; i < DATA.items.length; i++) if (DATA.items[i].id === id) return DATA.items[i];
    return null;
  }
  function fact(icon, k, v) {
    return '<li><span class="of-k">' + icon + " " + esc(k) + '</span><span class="of-v">' + esc(v) + "</span></li>";
  }
  function scrollTop() {
    var panel = modal.querySelector(".modal-panel");
    if (panel) panel.scrollTop = 0;
  }

  /* ---- HOME: category headers + office cards (like Services) ---- */
  function renderHome() {
    var html = "";
    DATA.items.forEach(function (it) {
      html += '<div class="service-cat" id="lbsec-' + esc(it.id) + '">';
      html += '<h3 class="cat-title">' + it.icon + " " + esc(it.name) + "</h3>";
      html += '<div class="svc-grid">';
      (it.offices || []).forEach(function (o, i) {
        html +=
          '<button class="svc-card" type="button" data-open-office="' + esc(it.id) + '" data-idx="' + i + '">' +
            '<div class="service-top"><div class="service-icon">' + it.icon + "</div>" +
            "<h3>" + esc(o.name) + "</h3></div>" +
            (o.timing ? '<p class="service-desc">🕒 ' + esc(o.timing) + "</p>" : "") +
            '<span class="svc-count">View details ›</span>' +
          "</button>";
      });
      html += "</div></div>";
    });
    views.innerHTML = html;
  }

  /* ---- DETAIL: one office ---- */
  function renderOffice(itemId, idx) {
    var it = itemById(itemId);
    if (!it) return renderHome();
    var o = (it.offices || [])[idx];
    if (!o) return renderHome();

    var html = '<button class="view-back" type="button" data-back="home">‹ Local Body</button>';
    html += '<h3 class="view-title">' + it.icon + " " + esc(o.name) + "</h3>";
    html += '<div class="provider-card" style="max-width:520px">';
    html += '<ul class="office-facts">';
    if (o.timing) html += fact("🕒", "Timing", o.timing);
    if (o.address) html += fact("📍", "Address", o.address);
    if (o.incharge) html += fact("👤", "In-charge", o.incharge);
    if (o.extra) html += fact("ℹ️", "Info", o.extra);
    if (o.services) html += fact("🧾", "Services", o.services);
    html += "</ul>";
    if (o.phone) html += '<a class="service-btn" href="tel:' + esc(o.phone) + '">📞 Call</a>';
    html += "</div>";
    views.innerHTML = html;
    scrollTop();
  }

  /* ---- navigation ---- */
  views.addEventListener("click", function (e) {
    var open = e.target.closest("[data-open-office]");
    if (open) { renderOffice(open.getAttribute("data-open-office"), +open.getAttribute("data-idx")); return; }
    var back = e.target.closest("[data-back]");
    if (back) { renderHome(); scrollTop(); return; }
  });

  /* ---- open / close ---- */
  function openModal(itemId) {
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    renderHome(); // always start from the list
    if (itemId) {
      var el = document.getElementById("lbsec-" + itemId);
      if (el) {
        window.setTimeout(function () { el.scrollIntoView({ behavior: "smooth", block: "start" }); }, 60);
        return;
      }
    }
    scrollTop();
  }
  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  document
    .querySelectorAll('a[href="#localbody"], a[href^="#lb-"]')
    .forEach(function (a) {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        var href = a.getAttribute("href").slice(1);
        openModal(href.indexOf("lb-") === 0 ? href.slice(3) : null);
        if (a.blur) a.blur();
      });
    });

  modal.querySelectorAll("[data-close]").forEach(function (el) {
    el.addEventListener("click", closeModal);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
  });

  renderHome();
})();
