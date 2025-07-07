import { Step, Table, BeforeSuite, AfterSuite } from "gauge-ts";
import { strictEqual } from 'assert';
import assert = require("assert");
import { chromium, Browser, Page, BrowserContext } from 'playwright';

let browser: Browser;
let context: BrowserContext;
let page: Page;

export default class StepImplementation {
    @BeforeSuite()
    public async beforeSuite() {
        browser = await chromium.launch({ headless: false });
        context = await browser.newContext();
        page = await context.newPage();
    }

    @Step("Open todo application")
    public async openTodo() {
        await page.goto("https://todo.taiko.dev");
    }

    @Step("Add task <item>")
    public async addTask(item: string) {
        await page.fill('.new-todo', item);
        await page.press('.new-todo', 'Enter');
    }

    @Step("Must display <message>")
    public async checkDisplay(message: string) {
        const element = await page.locator(`text=${message}`);
        assert.ok(await element.isVisible());
    }

    @Step("Add tasks <table>")
    public async addTasks(table: Table) {
        for (var row of table.getTableRows()) {
            await page.fill('.new-todo', row.getCell("description"));
            await page.press('.new-todo', 'Enter');
        }
    }

    @Step("Complete tasks <table>")
    public async completeTasks(table: Table) {
        for (var row of table.getTableRows()) {
            const description = row.getCell("description");
            const checkbox = page.locator('li').filter({ hasText: description }).locator('input[type="checkbox"]');
            await checkbox.check();
        }
    }

    @Step("View <type> tasks")
    public async viewTasks(type: string) {
        await page.click(`text=${type}`);
    }

    @Step("Must have <table>")
    public async mustHave(table: Table) {
        for (var row of table.getTableRows()) {
            const description = row.getCell("description");
            const element = page.locator(`text=${description}`);
            assert.ok(await element.isVisible());
        }
    }

    @Step("Must not have <table>")
    public async mustNotHave(table: Table) {
        for (var row of table.getTableRows()) {
            const description = row.getCell("description");
            const element = page.locator(`text=${description}`);
            assert.ok(!(await element.isVisible()));
        }
    }

    @Step("Clear all tasks")
    public async clearAllTasks() {
        await page.evaluate(() => localStorage.clear());
    }

    @AfterSuite()
    public async afterSuite() {
        if (context) await context.close();
        if (browser) await browser.close();
    }
}
