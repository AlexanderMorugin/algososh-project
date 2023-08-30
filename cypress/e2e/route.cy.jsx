describe("Тестирование переходов по страницам", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("Главная страница", () => {
    cy.contains("МБОУ АЛГОСОШ");
  });

  it("Переход на страницу - Строка", () => {
    cy.visit("http://localhost:3000/recursion");
    cy.contains("Строка");
  });

  it("Переход на страницу - Последовательность Фибоначчи", () => {
    cy.visit("http://localhost:3000/fibonacci");
    cy.contains("Последовательность Фибоначчи");
  });

  it("Переход на страницу - Сортировка массива", () => {
    cy.visit("http://localhost:3000/sorting");
    cy.contains("Сортировка массива");
  });

  it("Переход на страницу - Стек", () => {
    cy.visit("http://localhost:3000/stack");
    cy.contains("Стек");
  });

  it("Переход на страницу - Очередь", () => {
    cy.visit("http://localhost:3000/queue");
    cy.contains("Очередь");
  });

  it("Переход на страницу - Связный список", () => {
    cy.visit("http://localhost:3000/list");
    cy.contains("Связный список");
  });
});
