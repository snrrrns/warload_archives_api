ALTER TABLE `weapons` RENAME COLUMN `name` TO `type`;--> statement-breakpoint
DROP INDEX IF EXISTS `weapons_name_unique`;--> statement-breakpoint
CREATE UNIQUE INDEX `weapons_type_unique` ON `weapons` (`type`);