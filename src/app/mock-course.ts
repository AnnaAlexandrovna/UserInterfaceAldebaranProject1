import {Course} from './course';

export const COURSE: Course = {
  nameOfCourse: 'GIT первый commit', category: "GIT",
  discriptionOfCourse: "Информация о курсе - данный курс предназначен для ознакомления пользователя с основами системы контроля версий GIT. В данном сценарии пользователи смогут достичь следующие цели: ознакомиться с командами init, status, . add, commit, по окончанию сценария будет сделаны первые изменения в системе GIT",
  idOfCourse: 'очень длиннное id'
};

export const COURSES: Course[] = [
  {
    nameOfCourse: 'GIT первый commit', category: "GIT",
    discriptionOfCourse: "Информация о курсе - данный курс предназначен для ознакомления пользователя с основами системы контроля версий GIT. В данном сценарии пользователи смогут достичь следующие цели: ознакомиться с командами init, status, . add, commit, по окончанию сценария будет сделаны первые изменения в системе GIT",
    idOfCourse: '1'
  },
  {
    nameOfCourse: 'GIT изучаем CI/CD', category: "GIT",
    discriptionOfCourse: "Информация о курсе - данный курс предназначен для ознакомления пользователя с понятиями CI/CD в GIT. В данном сценарии пользователи смогут достичь следующие цели: понять предназначения компанентов CI/CD; по окончанию сценария будет сделан простые настойки CI/CD в системе GIT",
    idOfCourse: '2'
  },
  {
    nameOfCourse: 'Основы Docker', category: "Docker",
    discriptionOfCourse: "Информация о курсе - данный курс предназначен для ознакомления пользователя с основами Docker. В данном сценарии пользователи смогут достичь следующие цели: ознакомиться с предназначением Docker; изучить базовые понятия, без которых невозможно дальнейшее изучение Docker",
    idOfCourse: '3'
  },
  {
    nameOfCourse: '111', category: "111",
    discriptionOfCourse: "111",
    idOfCourse: '4'
  },
  {
    nameOfCourse: '222', category: "222",
    discriptionOfCourse: "222",
    idOfCourse: '5'
  }

];
