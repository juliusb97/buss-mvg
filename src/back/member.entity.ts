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

	static deserialize(member: string): Member {
		let mo = JSON.parse(member);

		return new Member(
			mo.firstName,
			mo.lastName,
			date.deserialize(mo.dob),
			Address.deserialize(mo.location),
			Convent[mo.convent],
			mo.title,
			date.deserialize(mo.joinDate),
			date.deserialize(mo.marriageDate),
			mo.marriage,
			Mail.deserialize(mo.mailPrivat),
			Mail.deserialize(mo.mailWork),
			date.deserialize(mo.dobPartner),
			date.deserialize(mo.diakon),
			mo.description,
			Retirement[mo.retired],
			mo.telWork,
			mo.telPrivate,
			mo.faxWork,
			mo.faxPrivate,
		);
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
		return JSON.stringify(this);
	}

	static deserialize(addressInput: string){
		let obj = JSON.parse(addressInput);
		let town = obj.address;
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
			date: this.toString()
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