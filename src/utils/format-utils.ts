import { Guild, Locale } from 'discord.js';
import { filesize } from 'filesize';
import { Duration } from 'luxon';

export class FormatUtils {
	public static roleMention(guild: Guild, discordId: string): string {
		if (discordId === `@here`) {
			return discordId;
		}

		if (discordId === guild.id) {
			return `@everyone`;
		}

		return `<@&${discordId}>`;
	}

	public static channelMention(discordId: string): string {
		return `<#${discordId}>`;
	}

	public static userMention(discordId: string): string {
		return `<@!${discordId}>`;
	}

	public static duration(milliseconds: number, langCode: Locale): string {
		return Duration.fromObject(
			Object.fromEntries(
				Object.entries(
					Duration.fromMillis(milliseconds, { locale: langCode })
						.shiftTo(`year`, `quarter`, `month`, `week`, `day`, `hour`, `minute`, `second`)
						.toObject(),
				).filter(([_, value]) => !!value), // Remove units that are 0
			),
		).toHuman({ maximumFractionDigits: 0 });
	}

	public static fileSize(bytes: number): string {
		return filesize(bytes, { output: `string`, pad: true, round: 2 }).toString();
	}
}
