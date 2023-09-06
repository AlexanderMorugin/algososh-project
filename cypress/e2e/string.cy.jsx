import { DELAY_IN_MS } from "../../src/constants/delays";
import { circle, circleChanging, circleDefault, circleModified, loader } from "../constants";

describe("Тестирование алгоритма - Строка", () => {
  beforeEach(() => {
    cy.visit("/recursion");
    cy.get("button").last().as("button");
    cy.get("input").as("input");
  });

  it("Если в инпуте пусто, то кнопка добавления недоступна", () => {
    cy.get("@input").should("have.value", "");
    cy.get("@button").should("be.disabled");
  });

  it("Строка разворачивается корректно", () => {
    cy.get("@input").type("собака");
    cy.get("@button").should("not.be.disabled");

    cy.wait(DELAY_IN_MS);

    cy.get("@button").click();
    cy.get("@button")
      .invoke("attr", "class")
      .then((className) => expect(className).contains(loader));

    cy.get(circle).then((item) => {
      cy.get(item[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(circleChanging));
      cy.get(item[0]).children().should("have.text", "с");

      cy.get(item[1])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(circleDefault));
      cy.get(item[1]).children().should("have.text", "о");

      cy.get(item[2])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(circleDefault));
      cy.get(item[2]).children().should("have.text", "б");

      cy.get(item[3])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(circleDefault));
      cy.get(item[3]).children().should("have.text", "а");

      cy.get(item[4])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(circleDefault));
      cy.get(item[4]).children().should("have.text", "к");

      cy.get(item[5])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(circleChanging));
      cy.get(item[5]).children().should("have.text", "а");

      cy.wait(DELAY_IN_MS);

      cy.get(item[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(circleModified));
      cy.get(item[0]).children().should("have.text", "а");

      cy.get(item[1])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(circleChanging));
      cy.get(item[1]).children().should("have.text", "о");

      cy.get(item[2])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(circleDefault));
      cy.get(item[2]).children().should("have.text", "б");

      cy.get(item[3])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(circleDefault));
      cy.get(item[3]).children().should("have.text", "а");

      cy.get(item[4])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(circleChanging));
      cy.get(item[4]).children().should("have.text", "к");

      cy.get(item[5])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(circleModified));
      cy.get(item[5]).children().should("have.text", "с");

      cy.wait(DELAY_IN_MS);

      cy.get(item[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(circleModified));
      cy.get(item[0]).children().should("have.text", "а");

      cy.get(item[1])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(circleModified));
      cy.get(item[1]).children().should("have.text", "к");

      cy.get(item[2])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(circleChanging));
      cy.get(item[2]).children().should("have.text", "б");

      cy.get(item[3])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(circleChanging));
      cy.get(item[3]).children().should("have.text", "а");

      cy.get(item[4])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(circleModified));
      cy.get(item[4]).children().should("have.text", "о");

      cy.get(item[5])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(circleModified));
      cy.get(item[5]).children().should("have.text", "с");

      cy.wait(DELAY_IN_MS);

      cy.get(item[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(circleModified));
      cy.get(item[0]).children().should("have.text", "а");

      cy.get(item[1])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(circleModified));
      cy.get(item[1]).children().should("have.text", "к");

      cy.get(item[2])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(circleModified));
      cy.get(item[2]).children().should("have.text", "а");

      cy.get(item[3])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(circleModified));
      cy.get(item[3]).children().should("have.text", "б");

      cy.get(item[4])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(circleModified));
      cy.get(item[4]).children().should("have.text", "о");

      cy.get(item[5])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(circleModified));
      cy.get(item[5]).children().should("have.text", "с");
    });
  });
});