const ERROR_CODE_BAD_REQUEST = 400;
const ERROR_CODE_UNAUTHORIZED = 401;
const ERROR_CODE_FORBIDDEN = 403;
const ERROR_CODE_NOT_FOUND = 404;
const ERROR_CODE_CONFLICT = 409;
const ERROR_CODE_INTERNAL_SERVER_ERROR = 500;
const ERROR_CODE_DUPLICATE = 11000;

const BAD_REQUEST = 'Некорректный запрос';
const NOT_FOUND_FILM = 'Фильм не найден';
const NOT_FOUND_LINK = 'Запрашиваемый ресурс не найден';
const ACCESS_ERROR_FILM = 'У вас нет прав на удаление фильма';
const WRONG_DATA_USER = 'Некорректные почта или пароль';
const NOT_FOUND_USER = 'Пользователь не найден';
const CONFLICT_ERROR = 'Попробуйте другой email';
const WRONG_LINK = 'Некорретный адрес ссылки';
const WRONG_EMAIL = 'Некорректный адрес почты';
const UNAUTHORIZED_ERROR = 'Необходимо авторизоваться в приложении';
const INTERNAL_SERVER_ERROR = 'Внутренняя ошибка сервера';
const ALREADY_EXISTS_EMAIL = 'Попробуйте другую почту';

const MOVIE_SCHEMA_ERROR_HANDLER = {
  COUNTRY: 'Поле "страна" обязательно для заполнения',
  DIRECTOR: 'Поле "режиссер" обязательно для заполнения',
  DURATION: 'Поле "длительность" обязательно для заполнения',
  YEAR: 'Поле "год" обязательно для заполнения',
  DESCRIPTION: 'Поле "описание" обязательно для заполнения',
  IMAGE: 'Поле "картинка" обязательно для заполнения в формате URL-ссылки',
  TRAILER_LINK: 'Поле "трейлер" обязательно для заполнения в формате URL-ссылки',
  THUMBNAIL:
    'Поле "миниатюра" обязательно для заполнения в формате URL-ссылки',
  MOVIE_ID:
    'Поле "ID" - обязательное поле',
  NAME_RU:
    'Поле "наименование на русском" обязательно для заполнения',
  NAME_EN:
    'Поле "наименованеи на английском" обязательно для заполнения',
  ERROR_URL: 'Неправильный формат ссылки',
};

module.exports = {
  ERROR_CODE_DUPLICATE,
  ERROR_CODE_BAD_REQUEST,
  ERROR_CODE_UNAUTHORIZED,
  ERROR_CODE_FORBIDDEN,
  ERROR_CODE_NOT_FOUND,
  ERROR_CODE_CONFLICT,
  ERROR_CODE_INTERNAL_SERVER_ERROR,
  BAD_REQUEST,
  NOT_FOUND_FILM,
  ACCESS_ERROR_FILM,
  WRONG_DATA_USER,
  NOT_FOUND_USER,
  CONFLICT_ERROR,
  WRONG_LINK,
  WRONG_EMAIL,
  UNAUTHORIZED_ERROR,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND_LINK,
  ALREADY_EXISTS_EMAIL,
  MOVIE_SCHEMA_ERROR_HANDLER,
};
