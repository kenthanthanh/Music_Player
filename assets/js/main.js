const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = "Music_Player";

const playList = $(".playlist");
const cd = $(".cd");

const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");

const playBtn = $(".btn-toggle-play");
const player = $(".player");
const progress = $("#progress");
const nextBtn = $(".btn-next");
const prevBtn = $(".btn-prev");
const random = $(".btn-random");
const repeat = $(".btn-repeat");

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    songs: [
        {
            name: "Vở Kịch Của Em (Remix)",
            tg: "HuyN × Trường Alex",
            linkMusic:
                "./assets/audio/y2meta.com - Vở Kịch Của Em (Remix) __ HuyN × Trường Alex - Remix _ Nhạc Trẻ Remix Hottrend Tiktok (320 kbps).mp3",
            linkImg: "./assets/img/anh/dy.jpg",
        },
        {
            name: "Chờ đợi có đáng sợ lofi",
            tg: "Andiez x Freak D",
            linkMusic:
                "./assets/audio/y2meta.com - Chờ Đợi Có Đáng Sợ (Lofi Ver.) - Andiez x Freak D (320 kbps).mp3",
            linkImg: "./assets/img/anh/chodoi.jpg",
        },

        {
            name: "Call Of Silence x Akuma No Ko",
            tg: "Japandee",
            linkMusic:
                "./assets/audio/y2meta.com - Call Of Silence x Akuma No Ko - Mit Ft Japandee Remix _ Nhạc Hot Tik Tok Remix Mới Nhất 2023 (320 kbps).mp3",
            linkImg: "./assets/img/anh/gambar-lambang-attack-on-titan-18.jpg",
        },
        {
            name: "Yêu Người Có Ước Mơ (Lofi Ver)",
            tg: "buitruonglinh x CaoTri",
            linkMusic:
                "./assets/audio/y2meta.com - Yêu Người Có Ước Mơ (Lofi Ver.) - buitruonglinh x CaoTri (320 kbps).mp3",
            linkImg: "./assets/img/anh/sddefault (3).jpg",
        },
        {
            name: "id 072019",
            tg: "3107 ft 267",
            linkMusic:
                "./assets/audio/y2meta.com - W_n - id 072019 _ 3107 ft 267 _ Lofi Version (320 kbps).mp3",
            linkImg:
                "./assets/img/anh/artworks-II9KL8xJy3oYXzdn-10nPdQ-t500x500.jpg",
        },
        {
            name: "HỘI PHÁP SƯ (FAIRY TAIL)",
            tg: "QUANG NHẬT REMIX",
            linkMusic:
                "./assets/audio/y2meta.com - HỘI PHÁP SƯ (FAIRY TAIL) - QUANG NHẬT REMIX _ BẢN THÁNH CA HỒI SINH REMIX HOT TIKTOK _ NEWT MUSIC √ (320 kbps).mp3",
            linkImg: "./assets/img/anh/natsu-fairy-tail.jpg",
        },
        {
            name: "BỐN BỂ ƯỚC THỀ REMIX",
            tg: "NHẠC TRUNG",
            linkMusic:
                "./assets/audio/y2meta.com - BỐN BỂ ƯỚC THỀ REMIX ft TÚY HỒNG NHAN REMIX _ NHẠC TRUNG HOT TIKTOK 2023 (320 kbps).mp3",
            linkImg: "./assets/img/anh/thuy.jpg",
        },

        {
            name: "Suýt Nữa Thì (Lofi Ver.)",
            tg: "Andiez x Freak D",
            linkMusic:
                "./assets/audio/y2meta.com - Suýt Nữa Thì (Lofi Ver.) - Andiez x Freak D (320 kbps).mp3",
            linkImg:
                "./assets/img/anh/artworks-dW2oyJhF6TdwX10I-3tqVag-t500x500.jpg",
        },
        {
            name: "Ngày Em Đẹp Nhất",
            tg: "Tama x Bell [Lofi Ver]",
            linkMusic:
                "./assets/audio/y2meta.com - Ngày Em Đẹp Nhất - Tama x Bell「Lofi Ver」_ Vì ngày em đẹp nhất là ngày ./assets/img/anh mất em!!! (320 kbps).mp3",
            linkImg: "./assets/img/anh/sddefault (1).jpg",
        },
        {
            name: "Hẹn Em Ở Lần Yêu Thứ 2",
            tg: "Nguyenn x Đặng Tuấn Vũ x Freak D",
            linkMusic:
                "./assets/audio/y2meta.com - Hẹn Em Ở Lần Yêu Thứ 2 (Lofi Ver.) - Nguyenn x Đặng Tuấn Vũ x Freak D (320 kbps).mp3",
            linkImg: "./assets/img/anh/1200x630bb.jpg",
        },
    ],
    setConfig: function (key, value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
    },
    render: function () {
        const htmls = this.songs.map((song, index) => {
            return `
          <div class="song ${
              index === this.currentIndex ? "active" : ""
          }" data-index = "${index}">
      <div class="thumb"
      style="background-image: url('${song.linkImg}');">
      </div>
      <div class="body">
        <h3 class="title">${song.name}</h3>
        <p class="author">${song.tg}</p>
      </div>
      <div class="option">
        <i class="fas fa-ellipsis-h"></i>
      </div>
    </div>
          `;
        });
        playList.innerHTML = htmls.join("");
    },
    defineProperties: function () {
        Object.defineProperty(this, "currentSong", {
            get: function () {
                return this.songs[this.currentIndex];
            },
        });
    },
    handleEvents: function () {
        const _this = this;
        const cdWidth = cd.offsetWidth;
        // Xử lí CD quay và dừng
        const cdThumbAnimate = cdThumb.animate(
            [
                {
                    transform: "rotate(360deg)",
                },
            ],
            {
                duration: 10000,
                iterations: Infinity,
            }
        );
        cdThumbAnimate.pause();
        // Xử lí phóng to thu nhỏ CD
        document.onscroll = function () {
            const scrollTop =
                window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop;
            cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
            cd.style.opacity = newCdWidth / cdWidth;
        };

        // Xử lí khi click play
        playBtn.onclick = function () {
            if (_this.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
            // Khi baiif hát được play
            audio.onplay = function () {
                _this.isPlaying = true;
                player.classList.add("playing");
                cdThumbAnimate.play();
            };
            // khi bài hát được pause
            audio.onpause = function () {
                _this.isPlaying = false;
                player.classList.remove("playing");
                cdThumbAnimate.pause();
            };
            // Khi tiến độ bài hát thay đổi
            audio.ontimeupdate = function () {
                if (audio.duration) {
                    const progressPercent = Math.floor(
                        (audio.currentTime / audio.duration) * 100
                    );
                    progress.value = progressPercent;
                    // console.log(progress.value );
                }
            };

            // xử lí khi tua bài hát
            progress.onchange = function (e) {
                const seekTime = (audio.duration / 100) * e.target.value;
                audio.currentTime = seekTime;
                // console.log(e.target.value);
            };
            //  Khi next bài hát
            nextBtn.onclick = function () {
                if (_this.isRandom) {
                    _this.playRandom();
                } else {
                    _this.nextSong();
                }
                audio.play();
                _this.render();
                _this.scrollActiveSong();
            };
            //  Khi prev bài hát
            prevBtn.onclick = function () {
                if (_this.isRandom) {
                    _this.playRandom();
                } else {
                    _this.prevSong();
                }
                audio.play();
                _this.render();
                _this.scrollActiveSong();
            };
            //  Khi click random
            random.onclick = function (e) {
                _this.isRandom = !_this.isRandom;
                _this.setConfig("isRandom", _this.isRandom);
                random.classList.toggle("active", _this.isRandom);
            };

            // Xử lí next song khi audio ended
            audio.onended = function () {
                if (_this.isRepeat) {
                    audio.play();
                } else {
                    nextBtn.click();
                }
            };
            // Xử lí repeat bài hát
            repeat.onclick = function () {
                _this.isRepeat = !_this.isRepeat;
                _this.setConfig("isRepeat", _this.isRepeat);

                repeat.classList.toggle("active", _this.isRepeat);
            };
            // Lắng nghe click vào playList (danh sách nhạc )
            playList.onclick = function (e) {
                const songNode = e.target.closest(".song:not(.active)");
                if (
                    e.target.closest(".song:not(.active)") ||
                    e.target.closest("option")
                ) {
                    if (e.target.closest(".song:not(.active)")) {
                        _this.currentIndex = Number(songNode.dataset.index);
                        _this.loadCurrentSong();
                        audio.play();
                        _this.render();
                        // lỗi khi chưa tác động tơi trang sẽ không thực hiện các click
                    }
                    if (e.target.closest("option")) {
                        console.log("Can not execute!");
                    }
                }
            };
        };
    },
    // lỗi hiển thị action song ở trên khi cuộn xuống dưới
    scrollActiveSong: function () {
        setTimeout(() => {
            $(".song.active").scrollIntoView({
                behavior: "smooth",
                block: "nearest",
            });
        }, 300);
    },
    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.linkImg}')`;
        audio.src = this.currentSong.linkMusic;
        // console.log(heading, cdThumb, audio);
    },
    loadConfig: function () {
      this.isRandom = this.config.isRandom;
      this.isRepeat = this.config.isRepeat;

    },
    nextSong: function () {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },
    prevSong: function () {
        this.currentIndex--;
        if (this.currentIndex <= 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },
    playRandom: function () {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.songs.length);
        } while (newIndex === this.currentIndex);
        this.currentIndex = newIndex;
        this.loadCurrentSong();
    },
    playRepeat: function () {},
    start: function () {
      this.loadConfig();
        // định nghĩa thuộc tính cho obj
        this.defineProperties();
        // lắng nghe và xử lí các sự kkienej (DOM Event)
        this.handleEvents();
        // Tải thông tin của bài hát đầu tiên vào UI khi chạy ứng dụng
        this.loadCurrentSong();

        // this.currentSong;

        // Render lại danh sách bài hát
        this.render();

        random.classList.toggle("active", this.isRandom);
        repeat.classList.toggle("active", this.isRepeat);
    },
};
app.start();
