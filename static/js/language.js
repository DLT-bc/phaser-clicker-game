let arrLang = {
    'en': {
      'contact': 'Contact us',
      'login': 'Log in',
      'description': 'This is a revolution in blockchain learning sphere. We are a team. We made a cool game. Here will be information about our game.',
      'text': 'Do you want to make a lot of money?',
      'button': 'Start play',
      'password': 'Password',
      'tet': 'Block'
    },
  
    'ru': {
      'contact': 'Контакты',
      'login': 'Регистрация',
      'description': 'Это революция в сфере обучения блокчейну. Мы команда. Мы сделали крутую игру. Здесь будет информация о нашей игре.',
      'text': 'Хочешь зарабоать много денег?',
      'button': 'Начинай играть',
      'password': 'Пароль',
      'tet': 'блокчейн это круто'
    }
  }
  
  document.addEventListener('DOMContentLoaded', getLocalLang)
  
  $(function() {
    $('.language').click(function() {
      let lang = $(this).attr('id')
  
      saveLocalLanguage(lang)
  
      $('.lang').each(function(index, item) {
        $(this).text(arrLang[lang][$(this).attr('key')]);
      });
    });
  });
  
  
  function saveLocalLanguage(language) {
    let langs
  
    if (localStorage.getItem('langs') === null) {
        langs = []
    } else {
        langs = JSON.parse(localStorage.getItem('langs'))
    }
    
    langs.push(language)
    localStorage.setItem('langs', JSON.stringify(langs))
  }
  
  
  function getLocalLang() {
    let langs
    if (localStorage.getItem('langs') === null) {
        langs = []
    } else {
        langs = JSON.parse(localStorage.getItem('langs'))
    }
    langs.forEach(function (language) {
        let lang = langs[langs.length - 1]
        setTimeout(() => {
            $('.lang').each(function(index, item) {
                $(this).text(arrLang[lang][$(this).attr('key')]);
            });
        }, 0)
    })
  }