CREATE TABLE IF NOT EXISTS "air_drop_details" (
	"id" serial PRIMARY KEY NOT NULL,
	"air_drop_id" integer NOT NULL,
	"image" text,
	"banner" text,
	"step" text,
	"description" text,
	"previous_phase" text,
	"website" text,
	"twitter" text,
	"telegram" text,
	"discord" text,
	"blog" text,
	"github" text,
	"other_info" jsonb,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "air_drops" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"chain" text,
	"vote" integer,
	"reward" text,
	"winner" text,
	"deadline" timestamp DEFAULT now(),
	"confirmed" boolean DEFAULT false,
	"claimable" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "air_drop_details" ADD CONSTRAINT "air_drop_details_air_drop_id_air_drops_id_fk" FOREIGN KEY ("air_drop_id") REFERENCES "public"."air_drops"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
