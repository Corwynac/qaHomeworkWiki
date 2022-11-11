import { WebDriver, Builder, Capabilities, By, WebElement, until } from "selenium-webdriver";

const driver: WebDriver = new Builder()
  .withCapabilities(Capabilities.chrome())
  .build();
  
  const chromedriver = require("chromedriver");

export class SpecPage {
    driver: WebDriver;
    url: string = "https://www.google.com"
    searchBar: By = By.name('q')
    results: By = By.id('rso')
    constructor(driver: WebDriver){
        this.driver = driver
    }

    async navigate() {
        await this.driver.get(this.url)
        await this.driver.wait(until.elementLocated(this.searchBar))
    }
    async getElement(elementBy: By): Promise<WebElement> {
        await this.driver.wait(until.elementLocated(elementBy))
        let element = await this.driver.findElement(elementBy)
        await this.driver.wait(until.elementIsVisible(element))
        return element
    }

    async setInput(elementBy: By, keys: any): Promise<void> {
        let input = await this.getElement(elementBy)
        await input.clear()
        return input.sendKeys(keys);
    }
    async sendKeys(elementBy: By, keys){
        await this.driver.wait(until.elementLocated(elementBy))
        return driver.findElement(elementBy).sendKeys(keys)

    }
    async doSearch(searchTerm: String){
        return this.setInput(this.searchBar, `${searchTerm}\n`)

    } 
    async getText (elementBy: By){
        await this.driver.wait(until.elementLocated(elementBy))
        return this.driver.findElement(elementBy).getText()
    }
    async getResults(){
        return this.getText(this.results)
    }
}
