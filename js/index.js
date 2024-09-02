let API_KEY = 'api_key=5ee7e09b085428bf8b8997a13b26ded2';
let BASE_URL = 'https://api.themoviedb.org/3';
let API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
let SEARCH_URL = BASE_URL + '/search/movie?' + API_KEY + '&query=';
let NOW_PLAYING_URL = BASE_URL + '/movie/now_playing?' + API_KEY;

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

// دالة لجلب الأفلام
function getMovies(url) {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data.results);  // عرض النتائج في وحدة التحكم
      showMovies(data.results);  // عرض الأفلام على الصفحة
    })
    .catch(error => {
      console.error('حدث خطأ أثناء جلب البيانات:', error);
    });
}

// دالة لعرض الأفلام
function showMovies(movies) {
  main.innerHTML = '';  // تنظيف المحتوى الحالي
  movies.forEach(movie => {
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    
    // إضافة رابط لتوجيه المستخدم لصفحة الفيلم عند النقر
    movieEl.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
      <div class="movie-info">
        <h3>${movie.title}</h3>
        <span>${movie.vote_average}</span>
      </div>
    `;

    // إضافة مستمع للنقر لإعادة التوجيه لصفحة الفيلم على موقعك
    movieEl.addEventListener('click', () => {
      window.location.href = `movie.html?id=${movie.id}`;  // إعادة التوجيه مع معرف الفيلم
    });

    main.appendChild(movieEl);
  });
}


// استدعاء الدالة لجلب الأفلام الجديدة عند تحميل الصفحة
getMovies(NOW_PLAYING_URL);

// مستمع للنموذج للبحث
form.addEventListener('submit', (e) => {
  e.preventDefault();  // منع السلوك الافتراضي للنموذج

  const searchTerm = search.value;

  if (searchTerm && searchTerm !== '') {
    getMovies(SEARCH_URL + searchTerm);  // البحث عن الأفلام باستخدام المصطلح المدخل
    search.value = '';  // تنظيف حقل البحث بعد الإرسال
  } else {
    window.location.reload();  // إعادة تحميل الصفحة إذا كان البحث فارغًا
  }
});



// Toggle menu for small screens
document.querySelector('.menu-toggle').addEventListener('click', function () {
  document.querySelector('.nav-links').classList.toggle('active');
});



