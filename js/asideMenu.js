function insertAside() {
  document.write(`
    <div class="col-md-2"  style="background-color: white;">
      <aside class="border rounded p-3" style="background-color: white;">
        <h3>MENU</h3>


        <!-- 주요 게시판 섹션 -->
        <h4>Main Boards</h4>
        <ul class="list-group">
          <li class="list-group-item d-flex align-items-center" id="menu-explore">
            <img src="./assets/icon-menu-N5f.png" class="icon mr-2" alt="Explore"/>
            <a href="explore.html">둘러보기</a>
          </li>
          <li class="list-group-item d-flex align-items-center" id="menu-profile">
            <img src="./assets/icon-people-HFf.png" class="icon mr-2" alt="Profile"/>
            <a href="profile.html">프로필</a>
          </li>
          <li class="list-group-item d-flex align-items-center" id="menu-diary-list">
            <img src="./assets/icon-book-4QH.png" class="icon mr-2" alt="Diary List"/>
            <a href="diary-list.html">일기 목록</a>
          </li>
          <li class="list-group-item d-flex align-items-center" id="menu-recycle-bin">
            <img src="./assets/icon-trash-eRF.png" class="icon mr-2" alt="Recycle Bin"/>
            <a href="recycle-bin.html">휴지통</a>
          </li>
        </ul>

        <!-- 메뉴 섹션 -->
        <h4>Extras</h4>
        <ul class="list-group">
          <li class="list-group-item d-flex align-items-center" id="menu-emotion-calendar">
            <img src="./assets/icon-calender-FKX.png" class="icon mr-2" alt="Emotion Calendar"/>
            <a href="emotion-calendar.html">감정 달력</a>
          </li>
          <li class="list-group-item d-flex align-items-center" id="menu-memo">
            <img src="./assets/icon-thunder-J73.png" class="icon mr-2" alt="Memo"/>
            <a href="memo.html">메모</a>
          </li>
        </ul>

        <!-- 설정 섹션 -->
        <h4>Settings</h4>
        <ul class="list-group">
          <li class="list-group-item d-flex align-items-center" id="menu-ask">
            <img src="./assets/icon-guide-9i9.png" class="icon mr-2" alt="Ask"/>
            <a href="ask.html">도움말</a>
          </li>
          <li class="list-group-item d-flex align-items-center" id="menu-setting">
            <img src="./assets/icon-setting-4FB.png" class="icon mr-2" alt="Setting"/>
            <a href="setting.html">설정</a>
          </li>
        </ul>

      </aside>
    </div>
  `);
}

document.addEventListener("DOMContentLoaded", function () {
  var path = window.location.href;
  path = decodeURIComponent(path);

  var segments = path.split("/");
  var pageName = segments.pop() || segments.pop();

  pageName = pageName.replace(".html", "");

  var currentMenuItem = document.getElementById("menu-" + pageName);
  if (currentMenuItem) {
    currentMenuItem.classList.add("active-page");
  }
});
