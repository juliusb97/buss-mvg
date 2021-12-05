export {
	Address, 
	Mail,
	date,
	Convent,
	Retirement,
	Member,
	MemberChild,
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

	length = 19;

	toObject(){
		return {
			firstName: this.firstName, 
			lastName: this.lastName, 
			dob: this.dob.serialize(), 
			location: this.location.serialize(), 
			convent: this.convent.toString(),
			title: this.title,
			joinDate: this.joinDate.serialize(),
			marriageDate: this.marriageDate.serialize(),
			marriage: this.marriage,
			mailPrivat: this.mailPrivat.serialize(),
			mailWork: this.mailWork.serialize(),
			dobPartner: this.dobPartner.serialize(),
			diakon: this.diakon.serialize(),
			description: this.description,
			retired: this.retired.toString(),
			telWork: this.telWork,
			telPrivate: this.telPrivate,
			faxWork: this.faxWork,
			faxPrivate: this.faxPrivate 
		}
	}

	serialize(){
		return JSON.stringify(this.toObject());
	}

	iterable(): MemberChild<any>[] {
		return [
		new MemberChild<string>(this.firstName, "Vorname"),
		new MemberChild<string>(this.lastName, "Nachname"),
		new MemberChild<date>(this.dob, "Geburtsdatum"),
		new MemberChild<Address>(this.location, "Adresse"),
		new MemberChild<Convent>(this.convent, "Konvent"),
		new MemberChild<string>(this.title, "Titel"),
		new MemberChild<date>(this.joinDate, "Beitrittsdatum"),
		new MemberChild<date>(this.marriageDate, "Hochzeitsdatum"),
		new MemberChild<string>(this.marriage, "Ehe"),
		new MemberChild<Mail>(this.mailPrivat, "E-Mail privat"),
		new MemberChild<Mail>(this.mailWork, "E-Mail dienstlich"),
		new MemberChild<date>(this.dobPartner, "Geburtsdatum Partner"),
		new MemberChild<date>(this.diakon, "Diakondatum"),
		new MemberChild<string>(this.description, "Beschreibung"),
		new MemberChild<Retirement>(this.retired, "Ruhestand"),
		new MemberChild<string>(this.telWork, "Telefon dienstlich"),
		new MemberChild<string>(this.telPrivate, "Telefon privat"),
		new MemberChild<string>(this.faxWork, "Fax dienstlich"),
		new MemberChild<string>(this.faxPrivate, "Fax privat"),
		];
	}

	static deserialize(member: string): Member {
		let mo = JSON.parse(member);
		let convent: Convent = mo.convent;
		let retirement: Retirement = mo.retired;

		return new Member(
			mo.firstName,
			mo.lastName,
			new date(mo.dob.day, mo.dob.month, mo.dob.year),
			new Address(mo.location.town, mo.location.postal, mo.location.address),
			convent,
			mo.title,
			new date(mo.joinDate.day, mo.joinDate.month, mo.joinDate.year),
			new date(mo.marriageDate.day, mo.marriageDate.month, mo.marriageDate.year),
			mo.marriage,
			new Mail(mo.mailPrivat.mail),
			new Mail(mo.mailWork.mail),
			new date(mo.dobPartner.day, mo.dobPartner.month, mo.dobPartner.year),
			new date(mo.diakon.day, mo.diakon.month, mo.diakon.year),
			mo.description,
			retirement,
			mo.telWork,
			mo.telPrivate,
			mo.faxWork,
			mo.faxPrivate,
		);
	}
}

class MemberChild<T> {

	constructor(
		prop: T, displayName: string
	) {
		this.prop = prop;
		this.displayName = displayName;

		switch(displayName) {
			case "Beitrittsdatum":
			case "Hochzeitsdatum":
			case "Diakondatum":
			case "Gebursdatum Partner":
			case "Geburtsdatum": this.type = "date"; break;
			case "E-Mail privat":
			case "E-Mail dienstlich": this.type = "Mail"; break;
			case "Adresse": this.type = "Address"; break;
			case "Konvent": this.type = "Convent"; break;
			case "Ruhestand": this.type = "Retirement"; break;
			default: this.type = "string";
		}
	}

	public type: string;
	public prop: T;
	public displayName: string;

	mapPropertyToName(prop: string): string {
		let map: Record<string, string>;
		
		map = {
			firstName: "Vorname", 
			lastName: "Nachname", 
			dob: "Geburtsdatum", 
			location: "Addresse", 
			convent: "Konvent",
			title: "Titel",
			joinDate: "BuSs Beitrittsdatum",
			marriageDate: "Hochzeitsdatum",
			marriage: "Hochzeitsbeschreibung",
			mailPrivat: "Mail privat",
			mailWork: "Mail dienstlich",
			dobPartner: "Geburtsdatum Partner",
			diakon: "Diakon seit",
			description: "Allgemeine Beschreibung",
			retired: "Ruhestand",
			telWork: "Telefon dienstlich",
			telPrivate: "Telefon privat",
			faxWork: "Fax dienstlich",
			faxPrivate: "Fax Privat"
		};
	
		return map[prop];
	}

}

class Address {

	constructor(
		public town: string, 
		public postal: string, 
		public address: string) 
		{}

	toString(): string[]{
		return [this.postal + " " + this.town, this.address];
	}

	serialize(){
		return {
			town: this.town,
			postal: this.postal,
			address: this.address
		}
	}

	static deserialize(addressInput: string){
		let obj = JSON.parse(addressInput);
		let town = obj.town;
		let postal = obj.postal;
		let address = obj.address;

		return new Address(town, postal, address);
	}
}

class Mail{

	address: string;

	constructor(address: string) {
		if(address.indexOf("@") == -1) throw new Error("Mail-Adresse muss (at)-Zeichen beinhalten");
		else this.address = address;
	}

	serialize(){
		return {
			mail: this.address
		}
	}

	static deserialize(mail: string){
		let newMail = JSON.parse(mail);
		return new Mail(newMail);
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

	serialize(){
		return {
			day: this.day,
			month: this.month,
			year: this.year
		}
	}

	static deserialize(dateInput: string){
		console.log(dateInput);
		let newDate = JSON.parse(dateInput);

		return new date(newDate.day, newDate.month, newDate.year);
	}
}

enum Retirement{
	nicht = "",
	male = "Ruheständler",
	female = "Ruheständlerin"
}