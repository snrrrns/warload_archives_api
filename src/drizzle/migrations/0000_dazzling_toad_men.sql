CREATE TABLE `abilities` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`figure_id` integer NOT NULL,
	`series_id` integer NOT NULL,
	`leadership` integer,
	`power` integer NOT NULL,
	`intellect` integer NOT NULL,
	`political` integer,
	`charisma` integer,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`figure_id`) REFERENCES `figures`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`series_id`) REFERENCES `series`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `countries` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `figure_details` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`figure_id` integer NOT NULL,
	`born_era` text DEFAULT 'AD',
	`born_year` integer,
	`is_born_certain` integer DEFAULT true NOT NULL,
	`died_era` text DEFAULT 'AD',
	`died_year` integer,
	`is_died_certain` integer DEFAULT true NOT NULL,
	`portrait` text,
	`episode` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`figure_id`) REFERENCES `figures`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `figure_militaries` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`figure_id` integer NOT NULL,
	`military_id` integer,
	`joined_order` integer DEFAULT 1 NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`figure_id`) REFERENCES `figures`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`military_id`) REFERENCES `militaries`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `figure_weapons` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`figure_id` integer NOT NULL,
	`weapon_id` integer,
	`unique_name` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`figure_id`) REFERENCES `figures`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`weapon_id`) REFERENCES `weapons`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `figures` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`country_id` integer NOT NULL,
	`last_name` text,
	`first_name` text NOT NULL,
	`courtesy_name` text,
	`last_name_kana` text,
	`first_name_kana` text NOT NULL,
	`courtesy_name_kana` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`country_id`) REFERENCES `countries`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `militaries` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`country_id` integer NOT NULL,
	`name` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`country_id`) REFERENCES `countries`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `series` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `weapons` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `countries_name_unique` ON `countries` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `militaries_name_unique` ON `militaries` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `series_name_unique` ON `series` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `weapons_name_unique` ON `weapons` (`name`);