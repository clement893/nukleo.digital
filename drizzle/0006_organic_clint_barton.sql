CREATE TABLE `agency_leads` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(320) NOT NULL,
	`companyName` varchar(255),
	`agencySize` varchar(50),
	`techNeeds` text,
	`budget` varchar(50),
	`urgency` varchar(50),
	`qualificationScore` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `agency_leads_id` PRIMARY KEY(`id`)
);
