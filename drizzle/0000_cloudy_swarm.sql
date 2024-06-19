CREATE TABLE `air_drops` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`chain` text NOT NULL,
	`vote` integer NOT NULL,
	`reward` text NOT NULL,
	`winner` text NOT NULL,
	`deadline` text NOT NULL,
	`confirmed` integer NOT NULL,
	`claimable` integer NOT NULL,
	`created_at` text NOT NULL,
	`updatedAt` text NOT NULL
);
