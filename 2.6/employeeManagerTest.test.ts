import {Builder, By, Capabilities, until, WebDriver, WebElement } from "selenium-webdriver";
  const chromedriver = require("chromedriver");

  const driver: WebDriver = new Builder()
  .withCapabilities(Capabilities.chrome())
  .build();

  class employeePage {
      driver: WebDriver;
      url: string = "https://devmountain-qa.github.io/employee-manager/1.2_Version/index.html";
      header: By = By.css('.titleText');
      addEmployee: By = By.css('[name="addEmployee"]');
      newEmployee: By = By.css('[name="employee11"]');
      nameInput: By = By.css('[name="nameEntry"]');
      phoneInput: By = By.css('[name="phoneEntry"]');
      titleInput: By = By.css('[name="titleEntry"]');
      saveBtn: By = By.xpath('//button[@id="saveBtn"]');
      constructor(driver: WebDriver){
          this.driver = driver
      }
      async navigate(){
          await this.driver.get(this.url)
          await this.driver.wait(until.elementLocated(this.header))
      }
      async click(elementBy: By){
          await this.driver.wait(until.elementLocated(elementBy))
          return (await this.driver.findElement(elementBy)).click()
      }
      async sendKeys(elementBy: By, keys){
          await this.driver.wait(until.elementLocated(elementBy))
          return this.driver.findElement(elementBy).sendKeys(keys)
      }
      async getText(elementBy){
          await this.driver.wait(until.elementLocated(elementBy))
          return this.driver.findElement(elementBy).getText()
      }
      async setInput(elementBy: By, keys:any):Promise<void>{
          let input = await this.driver.findElement(elementBy)
          await input.click()
          await input.clear()
          return input.sendKeys(keys)
      }
  }
  
  const emPage = new employeePage(driver)

  describe("Employee Manager Test", () => {
      beforeEach(async () => {
          await emPage.navigate();
      })
      afterAll(async () => {
          await driver.quit()
      })
      test("adding an employee", async () => {
          await driver.wait(until.elementLocated(emPage.header))
          await driver.findElement(emPage.addEmployee).click()
          await driver.findElement(emPage.newEmployee).click()
          await driver.findElement(emPage.nameInput).click()
          await driver.findElement(emPage.nameInput).clear()
          await driver.findElement(emPage.nameInput).sendKeys("Change this")
          await driver.findElement(emPage.phoneInput).click()
          await driver.findElement(emPage.phoneInput).clear()
          await driver.findElement(emPage.phoneInput).sendKeys("Change this")
          await driver.findElement(emPage.titleInput).click()
          await driver.findElement(emPage.titleInput).clear()
          await driver.findElement(emPage.titleInput).sendKeys("Change this")
  })
  
  /* this is a commment */})