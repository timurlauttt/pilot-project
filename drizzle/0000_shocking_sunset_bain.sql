CREATE TABLE `content_blocks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`block_type` text NOT NULL,
	`block_key` text NOT NULL,
	`title` text,
	`subtitle` text,
	`description` text,
	`image_url` text,
	`price` integer,
	`rating` integer,
	`cta_label` text,
	`cta_link` text,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`is_active` integer DEFAULT true NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `content_blocks_block_key_unique` ON `content_blocks` (`block_key`);--> statement-breakpoint
CREATE TABLE `site_settings` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`clinic_name` text DEFAULT 'Klinik Kecantikan' NOT NULL,
	`logo_url` text,
	`whatsapp_number` text,
	`address` text,
	`instagram_url` text,
	`facebook_url` text,
	`tiktok_url` text,
	`theme_color` text DEFAULT '#e879a6',
	`seo_title` text,
	`seo_description` text,
	`operational_hours` text,
	`updated_at` integer NOT NULL
);
