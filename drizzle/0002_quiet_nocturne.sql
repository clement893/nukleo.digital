CREATE TABLE `media_assets` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`fileKey` varchar(512) NOT NULL,
	`url` varchar(1024) NOT NULL,
	`size` int NOT NULL,
	`mimeType` varchar(100) NOT NULL,
	`category` varchar(50) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `media_assets_id` PRIMARY KEY(`id`)
);
