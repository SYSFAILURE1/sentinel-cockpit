import { Client } from "@notionhq/client";

export default async function handler(req, res) {
    const notion = new Client({ auth: process.env.NOTION_API_KEY });
    const databaseId = process.env.NOTION_DATABASE_ID;
    const msg = req.query.msg || "No message provided";

    try {
        const response = await notion.pages.create({
            parent: { database_id: databaseId },
            properties: {
                Name: {
                    title: [
                        {
                            text: {
                                content: "Cockpit Sync: " + new Date().toLocaleString(),
                            },
                        },
                    ],
                },
                Message: {
                    rich_text: [
                        {
                            text: {
                                content: msg,
                            },
                        },
                    ],
                },
            },
        });
        res.status(200).json({ success: true, msg, notion_response: response });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}
