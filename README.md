# Проектирование Архитектуры Программных Систем
Разработка системы для сжатия, хранения и раздачи изображений

**Пользователи:** частные web/front-end разработчики, небольшие IT компании 

**Требования:**
1) Панель администратора:
   * создание нового проекта,
   * загрузка изображения в проект,
   * ручная конфигурация правил сжатия,
   * получение секретного ключа для конфигурация правил сжатия по API и его сброс,
   * просмотр ограничений на количество проектов/изображений/конфигураций
2) REST API для внешних приложений:
   * возможность изменить конфигурацию (только при наличии секретного ключа)
3) Сервер:
   * хранит изображения,
   * сжимает изображения согласно конфигурации,
   * раздаёт изображения,
   * обеспечивает работу Панели администратора и REST API для внешних приложений

**Дополнительный контекст:**
Для быстрой работы web приложения самое важное - сжатие данных, отправляемых по сети.  
К таким данным относятся в том числе изображения.  
Нередко в сервисах одни и те же изображения используются в блоках разного размера.  
Рассмотрим конкретный пример: автарка пользователя в диалогах на
https://vk.com/im/ и эта же аватарка на странице пользователя, если раскрыть её - одно и то же изображение.  
Но во втором случае его нужно рисовать в максимальном качестве, а в первом - это лишь круг диамтром 48px и
если загружать изображение 1920x1080 для его отображения, то сайт будет загружать дольше, чем мог бы.  
Поэтому я хочу разработать хранилище, которое позволяет указать несколько конфигураций (например 1080px, 200px и 50px) и загружать
в него изображния, которые будут сжаты под все указанные размеры, после чего их можно будет использовать в разных местах.
