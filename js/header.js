function insertHeader() {
  document.write(`
    <header id="mainHeader" class="d-flex justify-content-between align-items-center">
    <div class="logo-and-title d-flex align-items-center">
        <img src="./assets/-9Tf.png" alt="Logo" class="logo"/>
        <p class="app-name ms-2">My Diary</p>
    </div>
          <nav class="header-nav">
                <a href="index.html" class="nav-link">Index</a>
              <a href="home.html" class="nav-link">Home</a>
              <a href="diary-list.html" class="nav-link">Diary</a>
              <a href="new-record.html" class="nav-link">New</a>
              <a href="about.html" class="nav-link">About</a>
          </nav>
          <div class="audio-control">
              <audio id="myAudio" loop controls autoplay>
                  <source src="data/music.mp3" type="audio/mpeg" />
              </audio>
          </div>
      </header>
    `);
}
