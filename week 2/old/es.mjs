import dayjs from 'dayjs';

function Answer(text, username, date, score = 0) {
  this.text = text;
  this.username = username;
  this.score = score;
  this.date = dayjs(date);

  this.toString = () => {
    return `${this.username} replied '${this.text}' on ${this.date.format('DD MMM YYYY')} and got a score of ${this.score}`;
  }

}

function Question(text, username, date) {
    this.text = text;
    this.username = username;
    this.date = dayjs(date);
    this.answers = [];

    this.add = (answer) => {
        this.answers.push(answer);
    } 

    this.find = (username) => {
        return [...this.answers].filter(ans => ans.username === username);
    }

    this.afterDate = (date) => {
        return [...this.answers].filter(ans => ans.date.isAfter(dayjs(date)));
    }

    this.listByDate = () => {
        return [...this.answers].sort((ans1, ans2) => ans1.date.isAfter(ans2.date) ? 1 : -1);
    }

    this.listByScore = () => {
        return [...this.answers].sort((ans1, ans2) => ans2.score - ans1.score);
    }
}

function main() {
    const q = new Question('Is JS better than Python?', 'Luigi De Russis', '2024-02-27');

    q.add(new Answer('Yes', 'Luca Mannella', '2024-02-28', -10));
    q.add(new Answer('Not in a million year', 'Guido van Rossum', '2024-03-01', 5));
    q.add(new Answer('No', 'Albert Einstein', '2024-03-11'));
    q.add(new Answer('Then, I don\'t know', 'Luca Mannella', '2024-03-10'));

    q.find('Luca Mannella').forEach(ans => console.log(ans.toString()));
    console.log();

    q.afterDate('2024-02-29').forEach(ans => console.log(ans.toString()));
    console.log();

    q.listByDate().forEach(ans => console.log(ans.toString()));
    console.log();

    q.listByScore().forEach(ans => console.log(ans.toString()));
}

main();