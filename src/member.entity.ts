export {
	Address, 
	Mail,
	date,
	Convent,
	Retirement,
	Member,
	conventToColor
};

class Member {
	constructor(
		public firstName: string, 
		public lastName: string, 
		public dob: date, 
		public location: Address, 
		public convent: Convent,
		public title: string,
		public joinDate: date,
		public marriageDate: date,
		public marriage: string,
		public mailPrivat: Mail,
		public mailWork: Mail,
		public dobPartner: date,
		public diakon: date,
		public description: string,
		public retired: Retirement,
		public telWork: string,
		public telPrivate: string,
		public faxWork: string,
		public faxPrivate: string
		) {}

}

class Address {

	constructor(
		public town: string, 
		public postal: string, 
		public address: string) 
		{}

	toString(): string{
		return this.postal + " " + this.town + "\n" + this.address;
	}
}

class Mail{
	constructor(address: string) {
		if(address.indexOf("@") == -1) throw new Error("Mail-Adresse muss (at)-Zeichen beinhalten");
	}
}

enum Convent {
	O = "Oberlausitzer Konvent",
	N = "Niederschlesischer Konvent",
	B = "Berliner Konvent"
}

let colors = {
	"Oberlausitzer Konvent": "#553377",
	"Niederschlesischer Konvent": "#64c6ff" ,
	"Berliner Konvent": "#228855"
}

function conventToColor(convent: Convent): string{
	return colors[convent];
}

class date{
	constructor(day: number, month: number, year: number) {
		if(day < 1 && day > 31) throw new Error("Wert für Tag muss zwischen 1 und 31 liegen");
		if(month < 1 && month > 12) throw new Error("Wert für Monat muss zwischen 1 und 12 liegen");

		this.day = day;
		this.month = month;
		this.year = year;
	}

	day: number;

	month: number;

	year: number;

	toString(): string{
		let str = this.day.toString().padStart(2, "0") + ".";
		str += this.month.toString().padStart(2, "0") + ".";
		str += this.year.toString();
		return str;
	}
}

enum Retirement{
	nicht = "",
	male = "Ruheständler",
	female = "Ruheständlerin"
}