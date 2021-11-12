export {
	address, 
	mail,
	date,
	convent,
	retirement,
	member
};

class member {
	constructor(
		firstName: string, 
		lastName: string, 
		dob: date, 
		location: address, 
		convent: convent,
		title: string,
		joinDate: date,
		marriageDate: date,
		marriage: string,
		mailPrivat: mail,
		mailWork: mail,
		dobPartner: date,
		diakon: date,
		description: string,
		retired: retirement,
		telWork: string,
		telPrivate: string,
		faxWork: string,
		faxPrivate: string
		) {}

}

class address {

	constructor(
		public town: string, 
		public postal: string, 
		public address: string) 
		{}

	toString(): string{
		return this.postal + " " + this.town + "\n" + this.address;
	}
}

class mail{
	constructor(address: string) {
		if(address.indexOf("@") == -1) throw new Error("Mail-Adresse muss (at)-Zeichen beinhalten");
	}
}

interface convent {
	convent: "Oberlausitzer Konvent" | "Niederschlesischer Konvent" | "Berliner Konvent";
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

interface retirement{
	retired: "Ruheständler" | "Ruheständlerin";
}