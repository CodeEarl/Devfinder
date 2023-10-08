
var themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
var themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');

// Change the icons inside the button based on previous settings
if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    themeToggleLightIcon.classList.remove('hidden');
} else {
    themeToggleDarkIcon.classList.remove('hidden');
}

var themeToggleBtn = document.getElementById('theme-toggle');

themeToggleBtn.addEventListener('click', function() {

    // toggle icons inside button
    themeToggleDarkIcon.classList.toggle('hidden');
    themeToggleLightIcon.classList.toggle('hidden');

    // if set via local storage previously
    if (localStorage.getItem('color-theme')) {
        if (localStorage.getItem('color-theme') === 'light') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        }

    // if NOT set via local storage previously
    } else {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        }
    }
    
});


let url = `https://api.github.com/users/:username`;
const body = document.querySelector('body');
const search = document.getElementById('search');
const submit = document.getElementById('submit');
const error = document.querySelector('.error');
const avatar = document.getElementById('avatar');
const userName = document.getElementById('name');
const alias = document.getElementById('username');
const date = document.getElementById('date');
const Bio = document.getElementById('bio');
const repos = document.getElementById('repo');
const Followers = document.getElementById('foll');
const Following = document.getElementById('fol');
const place = document.getElementById('place');
const Blog = document.getElementById('link');
const Twitter = document.getElementById('twitter');
const Company = document.getElementById('company');
const allLinks = document.querySelectorAll('.link');

function getInputSearch() {
    return search.value.trim() || 'octocat';
}

function fetchData(URL_API) {
    fetch(URL_API.replace(':username', getInputSearch()))
        .then(function (response) {
            return response.json();
        }).then(function (responseParsed) {
            validateUser(responseParsed);
        }).catch(function (error) {
            alert('Error loading data');
            console.log(error);
        })
}

function validateUser(dataFetched) {
    if (dataFetched.message === "Not Found") {
        error.innerText = dataFetched.message;
        error.classList.replace('hidden', 'block');
    } else {
        error.classList.replace('block', 'hidden');
        showProfileData(dataFetched);
    }
}
function showProfileData(dataFetched) {
    let {
        login, avatar_url, html_url, name, company, blog, location, bio, twitter_username, public_repos, followers, following, created_at
    } = dataFetched;

    let creationDate = new Date(created_at);
    let joinDate = creationDate.toLocaleString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' });

    avatar.setAttribute('src', avatar_url);

    userName.textContent = name || login;
    alias.textContent = `@${login}`;
    alias.setAttribute('href', html_url);
    date.textContent = `Joined ${joinDate}`;

    Bio.textContent = bio || `No bio found`;

    repos.textContent = public_repos || `0`;
    Followers.textContent = followers || `0`;
    Following.textContent = following || `0`;

    place.textContent = location || `Not Available`;
    Blog.textContent = blog || `Not Available`;
    Twitter.textContent = (twitter_username) ? `@${twitter_username}` : `Not Available`;
    Company.textContent = company || `Not Available`;

    if (!location) linkNotAvaible(place);

    if (blog) {
        Blog.setAttribute('href', blog);
    } else {
        linkNotAvaible(Blog);
    }

    if (twitter_username) {
        Twitter.setAttribute('href', `https://twitter.com/${twitter_username}`);
    } else {
        linkNotAvaible(Twitter);
    }
 
    if (company) {
        Company.setAttribute('href', `https://github.com/${company}`);
    } else {
        linkNotAvaible(Company);
    }
}

function linkNotAvaible(element) {
    element.previousElementSibling.classList.add('profile__svg-notfound');
    element.classList.add('profile__link-notfound');
}

submit.addEventListener('click', function (event) {
    event.preventDefault();
    if (search.value) fetchData(url);
})

fetchData(url);