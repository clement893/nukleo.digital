CREATE TABLE `leo_sessions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`sessionId` varchar(64) NOT NULL,
	`pageContext` varchar(50) NOT NULL,
	`messageCount` int NOT NULL DEFAULT 0,
	`emailCaptured` int NOT NULL DEFAULT 0,
	`capturedEmail` varchar(320),
	`conversationDuration` int,
	`startedAt` timestamp NOT NULL DEFAULT (now()),
	`completedAt` timestamp,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `leo_sessions_id` PRIMARY KEY(`id`),
	CONSTRAINT `leo_sessions_sessionId_unique` UNIQUE(`sessionId`)
);
