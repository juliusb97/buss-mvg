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
		firstName: string, 
		lastName: string, 
		dob: date, 
		location: Address, 
		convent: Convent,
		title: string,
		joinDate: date,
		marriageDate: date,
		marriage: string,
		mailPrivat: Mail,
		mailWork: Mail,
		dobPartner: date,
		diakon: date,
		description: string,
		retired: Retirement,
		telWork: string,
		telPrivate: string,
		faxWork: string,
		faxPrivate: string
		) {
			this.firstName = new MemberChild<string>(firstName, "Vorname");
			this.lastName = new MemberChild<string>(lastName, "Nachname");
			this.dob = new MemberChild<date>(dob, "Geburtsdatum");
			this.location = new MemberChild<Address>(location, "Adresse");
			this.convent= new MemberChild<Convent>(convent, "Konvent");
			this.title = new MemberChild<string>(title, "Titel")
			this.joinDate = new MemberChild<date>(joinDate, "Beitrittsdatum")
			this.marriageDate = new MemberChild<date>(marriageDate, "Hochzeitsdatum")
			this.marriage = new MemberChild<string>(marriage, "Ehe")
			this.mailPrivat = new MemberChild<Mail>(mailPrivat, "E-Mail privat")
			this.mailWork = new MemberChild<Mail>(mailWork, "E-Mail dienstlich")
			this.dobPartner = new MemberChild<date>(dobPartner, "Geburtsdatum Partner")
			this.diakon = new MemberChild<date>(diakon, "Diakondatum")
			this.description = new MemberChild<string>(description, "Beschreibung")
			this.retired = new MemberChild<Retirement>(retired, "Ruhestand")
			this.telWork = new MemberChild<string>(telWork, "Telefon dienstlich")
			this.telPrivate = new MemberChild<string>(telPrivate, "Telefon privat")
			this.faxWork = new MemberChild<string>(faxWork, "Fax dienstlich")
			this.faxPrivate = new MemberChild<string>(faxPrivate, "Fax privat")

		}

		public firstName: MemberChild<string>;
		public lastName: MemberChild<string>;
		public dob: MemberChild<date>;
		public location: MemberChild<Address>;
		public convent: MemberChild<Convent>;
		public title: MemberChild<string>;
		public joinDate: MemberChild<date>;
		public marriageDate: MemberChild<date>;
		public marriage: MemberChild<string>;
		public mailPrivat: MemberChild<Mail>;
		public mailWork: MemberChild<Mail>;
		public dobPartner: MemberChild<date>;
		public diakon: MemberChild<date>;
		public description: MemberChild<string>;
		public retired: MemberChild<Retirement>;
		public telWork: MemberChild<string>;
		public telPrivate: MemberChild<string>;
		public faxWork: MemberChild<string>;
		public faxPrivate:  MemberChild<string>;

	length = 19;

	toObject(){
		return {
			firstName: this.firstName.prop, 
			lastName: this.lastName.prop, 
			dob: this.dob.prop.serialize(), 
			location: this.location.prop.serialize(), 
			convent: this.convent.prop.toString(),
			title: this.title.prop,
			joinDate: this.joinDate.prop.serialize(),
			marriageDate: this.marriageDate.prop.serialize(),
			marriage: this.marriage.prop,
			mailPrivat: this.mailPrivat.prop.serialize(),
			mailWork: this.mailWork.prop.serialize(),
			dobPartner: this.dobPartner.prop.serialize(),
			diakon: this.diakon.prop.serialize(),
			description: this.description.prop,
			retired: this.retired.prop.toString(),
			telWork: this.telWork.prop,
			telPrivate: this.telPrivate.prop,
			faxWork: this.faxWork.prop,
			faxPrivate: this.faxPrivate.prop 
		}
	}

	serialize(){
		return JSON.stringify(this.toObject());
	}

	iterable(): MemberChild<any>[] {
		return [
			this.firstName,
			this.lastName,
			this.dob,
			this.location,
			this.convent,
			this.title,
			this.joinDate,
			this.marriageDate,
			this.marriage,
			this.mailPrivat,
			this.mailWork,
			this.dobPartner,
			this.diakon,
			this.description,
			this.retired,
			this.telWork,
			this.telPrivate,
			this.faxWork,
			this.faxPrivate
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
			case "Geburtsdatum Partner":
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

	toDate(): Date {
		let date = new Date();
		date.setMonth(this.month - 1);
		date.setDate(this.day);
		date.setFullYear(this.year);

		return date;
	}

	toDateString(): string {
		return this.day.toString().padStart(2, "0") + "-" + this.month.toString().padStart(2, "0") + "-" + this.year;
	}

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
		let newDate = JSON.parse(dateInput);

		return new date(newDate.day, newDate.month, newDate.year);
	}
}

enum Retirement{
	nicht = "",
	male = "Ruheständler",
	female = "Ruheständlerin"
}