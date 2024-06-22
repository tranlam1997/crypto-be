CREATE TABLE `air_drop_details` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`air_drop_id` integer,
	`step` text,
	`description` text,
	`previous_phase` text,
	`website` text,
	`twitter` text,
	`telegram` text,
	`discord` text,
	`blog` text,
	`github` text,
	`other_info` text,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`air_drop_id`) REFERENCES `air_drops`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `air_drops` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`chain` text NOT NULL,
	`vote` integer NOT NULL,
	`reward` text NOT NULL,
	`winner` text NOT NULL,
	`deadline` text DEFAULT (CURRENT_TIMESTAMP),
	`confirmed` integer DEFAULT false,
	`claimable` integer DEFAULT false,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP)
);
