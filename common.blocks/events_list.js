var schedule = '{\
		"events": [ \
			{\
				"title":"Трансформационные инновации",\
				"date":"2018-07-15T12:00:00.000Z",\
				"person":"Для директора",\
				"type":"Лекция",\
				"img":"img/hr-system.jpg",\
				"url":"#"\
			}, \
			{"title":"Событие мирового уровня","date":"2018-07-19T12:00:00.000Z","img":"img/hr-system.jpg"},\
			{"title":"Событие мирового уровня","date":"2018-07-21T12:00:00.000Z","img":"img/hr-system.jpg"},\
			{"title":"Событие уровня попроще","date":"2018-07-18T12:00:00.000Z","img":"img/hr-system.jpg"}\
		]\
}';

function sortByDate(a, b) {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
}

function eventList() {

	this.datestart = new Date();
	this.schedule = JSON.parse(schedule, function (key, value) {
		if (key == 'date')
			return new Date(value);
		return value;
	});
    this.schedule.events.sort(sortByDate);

}

eventList.prototype.display = function () {

	var container = document.getElementById("events-list");
    var index, len;
    for (index = 0, len = this.schedule.events.length; index < len; ++index) {
        if (this.schedule.events[index].date >= this.datestart)
       		break;
    }

	for (var i = index, len = index + 3; i < this.schedule.events.length && i < len; i++) {

		var card = document.createElement("DIV");
		var cardimg = document.createElement("DIV");
		var cardinfo = document.createElement("DIV");
		var title = document.createElement("H3");
		var month = document.createElement("SPAN");
		var image = document.createElement("IMG");

		var textnode = document.createTextNode(this.schedule.events[i].title);


		title.className = "event-title";
		card.className = "event-card";
		month.className = "event-month";
		cardimg.className = "event-card-img";
		cardimg.style.backgroundImage = "url(" + this.schedule.events[i].img + ")";
		cardimg.style.backgroundSize = "cover";
		cardimg.style.backgroundPosition = "center";
		cardinfo.className = "event-card-info";

		container.appendChild(card);
		card.appendChild(cardimg);
		card.appendChild(cardinfo);
		title.appendChild(textnode);

		textnode = document.createTextNode(this.getMonthName(this.schedule.events[i].date.getMonth()));
		month.appendChild(textnode);

		cardimg.appendChild(image);
		cardinfo.appendChild(month);
		cardinfo.appendChild(title);
	}
};

eventList.prototype.getMonthName = function (month) {
    var monthList = ["января",
            "февраля",
            "марта",
            "апреля",
            "мая",
            "июня",
            "июля",
            "августа",
            "сентября",
            "октября",
            "ноября",
            "декабря"];
    return monthList[month];
};

eventList.prototype.getDates = function (month) {
    var dates = [];

    this.schedule.events.forEach(function(entry) {
        dates[dates.length] = entry.date;
    });
    return dates;
};

