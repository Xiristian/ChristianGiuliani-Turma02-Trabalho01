const Biblioteca = require("../src/Trabalho01Turma02");

describe("Testes da classe Biblioteca", () => {
  let biblioteca;
  let livro1;
  let livro2;
  let livro3;
  let membro1;
  let membro2;

  beforeEach(() => {
    biblioteca = new Biblioteca();
    livro1 = {
      titulo: "Livro 1",
      id: 1,
      emprestado: false,
      idMembro: undefined,
      autor: "Autor 1",
      genero: "Genero 1",
      ano: 2024,
    };
    livro2 = {
      titulo: "Livro 2",
      id: 2,
      emprestado: false,
      idMembro: undefined,
      autor: "Autor 2",
      genero: "Genero 2",
      ano: 2023,
    };
    livro3 = {
      titulo: "Livro 3",
      id: 3,
      emprestado: false,
      idMembro: undefined,
      autor: "Autor 1",
      genero: "Genero 2",
      ano: 2024,
    };
    membro1 = { nome: "Membro 1", id: 1 };
    membro2 = { nome: "Membro 2", id: 2 };
  });

  test("Deve iniciar sem livros e sem membros", () => {
    expect(biblioteca.livros.length).toBe(0);
    expect(biblioteca.membros.length).toBe(0);
  });

  test('Deve adicionar um livro "Livro 1"', () => {
    biblioteca.adicionarLivro(livro1);
    expect(Object.is(biblioteca.livros[0], livro1)).toBe(true);
  });

  test("Deve remover um livro adicionado", () => {
    biblioteca.adicionarLivro(livro1);
    biblioteca.removerLivro(livro1.id);
    expect(biblioteca.livros.length).toBe(0);
  });

  test('Deve encontrar o livro "Livro 1"', () => {
    biblioteca.adicionarLivro(livro1);
    biblioteca.adicionarLivro(livro2);
    expect(Object.is(biblioteca.buscarLivroPorId(livro1.id), livro1)).toBe(
      true
    );
  });

  test('Deve encontrar o livro "Livro 2"', () => {
    biblioteca.adicionarLivro(livro1);
    biblioteca.adicionarLivro(livro2);
    expect(Object.is(biblioteca.buscarLivroPorTitulo(livro2.titulo)[0], livro2)).toBe(
      true
    );
  });

  test("Deve encontrar todos os livros", () => {
    biblioteca.adicionarLivro(livro1);
    biblioteca.adicionarLivro(livro2);
    expect(biblioteca.listarLivros()).toContainEqual(livro1);
    expect(biblioteca.listarLivros()).toContainEqual(livro2);
    expect(biblioteca.listarLivros().length).toBe(2);
  });

  test('Deve adicionar um membro "Membro 1"', () => {
    biblioteca.adicionarMembro(membro1);
    expect(Object.is(biblioteca.membros[0], membro1)).toBe(true);
  });

  test("Deve remover um membro membro adicionado", () => {
    biblioteca.adicionarMembro(membro1);
    biblioteca.removerMembro(membro1.id);
    expect(biblioteca.membros.length).toBe(0);
  });

  test('Deve encontrar o membro "Membro 2"', () => {
    biblioteca.adicionarMembro(membro1);
    biblioteca.adicionarMembro(membro2);
    expect(Object.is(biblioteca.buscarMembroPorId(membro2.id), membro2)).toBe(
      true
    );
  });

  test("Deve encontrar todos os membros", () => {
    biblioteca.adicionarMembro(membro1);
    biblioteca.adicionarMembro(membro2);
    expect(biblioteca.listarMembros()).toContainEqual(membro1);
    expect(biblioteca.listarMembros()).toContainEqual(membro2);
    expect(biblioteca.listarMembros().length).toBe(2);
  });

  test('A biblioteca deve emprestar um livro para o "Membro 2"', () => {
    biblioteca.adicionarMembro(membro2);
    biblioteca.adicionarLivro(livro1);
    expect(biblioteca.emprestarLivro(livro1.id, membro2.id)).toBe(true);
    expect(biblioteca.buscarLivroPorId(livro1.id).emprestado).toBe(true);
    expect(biblioteca.buscarLivroPorId(livro1.id).idMembro).toBe(2);
  });

  test('A biblioteca não deve emprestar um livro já emprestado para o "Membro 2"', () => {
    biblioteca.adicionarMembro(membro1);
    biblioteca.adicionarMembro(membro2);
    biblioteca.adicionarLivro(livro1);
    biblioteca.emprestarLivro(livro1.id, membro1.id);
    expect(biblioteca.emprestarLivro(livro1.id, membro2.id)).toBe(false);
    expect(biblioteca.buscarLivroPorId(livro1.id).emprestado).toBe(true);
    expect(biblioteca.buscarLivroPorId(livro1.id).idMembro).toBe(1);
  });

  test("A biblioteca não deve emprestar um livro que não existe", () => {
    biblioteca.adicionarMembro(membro1);
    expect(biblioteca.emprestarLivro(livro2.id, membro2.id)).toBe(false);
  });

  test("A biblioteca não deve emprestar um livro para um membro que não existe", () => {
    biblioteca.adicionarLivro(livro2);
    expect(biblioteca.emprestarLivro(livro2.id, membro2.id)).toBe(false);
  });

  test('O livro deve ser devolvido', () => {
    biblioteca.adicionarMembro(membro1);
    biblioteca.adicionarLivro(livro1);
    biblioteca.emprestarLivro(livro1.id, membro1.id);
    expect(biblioteca.devolverLivro(livro1.id, membro1.id)).toBe(true);
    expect(biblioteca.buscarLivroPorId(livro1.id).emprestado).toBe(false);
    expect(biblioteca.buscarLivroPorId(livro1.id).idMembro).toBe(undefined);
  });

  test('Um livro que não foi emprestado não deve ser devolvido', () => {
    biblioteca.adicionarMembro(membro1);
    biblioteca.adicionarLivro(livro1);
    expect(biblioteca.devolverLivro(livro1.id, membro1.id)).toBe(false);
    expect(biblioteca.buscarLivroPorId(livro1.id).emprestado).toBe(false);
    expect(biblioteca.buscarLivroPorId(livro1.id).idMembro).toBe(undefined);
  });

  test("Deve listar todos os livros empretados", () => {
    biblioteca.adicionarMembro(membro1);
    biblioteca.adicionarLivro(livro1);
    biblioteca.adicionarLivro(livro2);
    biblioteca.adicionarLivro(livro3);
    biblioteca.emprestarLivro(livro1.id, membro1.id);
    biblioteca.emprestarLivro(livro2.id, membro1.id);
    expect(biblioteca.listarLivrosEmprestados()).toContainEqual(livro1);
    expect(biblioteca.listarLivrosEmprestados()).toContainEqual(livro2);
    expect(biblioteca.listarLivrosEmprestados()).not.toContainEqual(livro3);
    expect(biblioteca.listarLivrosEmprestados().length).toBe(2);
  });

  test("Deve listar todos os livros disponiveis", () => {
    biblioteca.adicionarMembro(membro1);
    biblioteca.adicionarLivro(livro1);
    biblioteca.adicionarLivro(livro2);
    biblioteca.adicionarLivro(livro3);
    biblioteca.emprestarLivro(livro1.id, membro1.id);
    biblioteca.emprestarLivro(livro2.id, membro1.id);
    expect(biblioteca.listarLivrosDisponiveis()).not.toContainEqual(livro1);
    expect(biblioteca.listarLivrosDisponiveis()).not.toContainEqual(livro2);
    expect(biblioteca.listarLivrosDisponiveis()).toContainEqual(livro3);
    expect(biblioteca.listarLivrosDisponiveis().length).toBe(1);
  });

  test("Deve conter a quantidade total de livros", () => {
    biblioteca.adicionarLivro(livro1);
    biblioteca.adicionarLivro(livro2);
    expect(biblioteca.contarLivros()).toBe(2);
  });

  test("Deve conter a quantidade total de membros", () => {
    biblioteca.adicionarMembro(membro1);
    biblioteca.adicionarMembro(membro2);
    expect(biblioteca.contarMembros()).toBe(2);
  });

  test('Deve listar os livros do "Autor 1"', () => {
    biblioteca.adicionarLivro(livro1);
    biblioteca.adicionarLivro(livro2);
    biblioteca.adicionarLivro(livro3);
    const livros = biblioteca.listarLivrosPorAutor("Autor 1");
    expect(livros).toContainEqual(livro1);
    expect(livros).not.toContainEqual(livro2);
    expect(livros).toContainEqual(livro3);
    expect(livros.length).toBe(2);
  });

  test('Deve listar os livros do "Genero 1"', () => {
    biblioteca.adicionarLivro(livro1);
    biblioteca.adicionarLivro(livro2);
    biblioteca.adicionarLivro(livro3);
    const livros = biblioteca.listarLivrosPorGenero("Genero 1");
    expect(livros).toContainEqual(livro1);
    expect(livros).not.toContainEqual(livro2);
    expect(livros).not.toContainEqual(livro3);
    expect(livros.length).toBe(1);
  });

  test("Deve listar os livros de 2024", () => {
    biblioteca.adicionarLivro(livro1);
    biblioteca.adicionarLivro(livro2);
    biblioteca.adicionarLivro(livro3);
    const livros = biblioteca.listarLivrosPorAno(2024);
    expect(livros).toContainEqual(livro1);
    expect(livros).not.toContainEqual(livro2);
    expect(livros).toContainEqual(livro3);
    expect(livros.length).toBe(2);
  });

  test("Deve atualizar as informações do livro", () => {
    biblioteca.adicionarLivro(livro1);
    biblioteca.adicionarLivro(livro2);
    biblioteca.adicionarLivro(livro3);
    novosDados = { autor: "Autor 3", ano: 2022 };
    let livroAntes = Object.assign({}, livro1);
    biblioteca.atualizarInformacaoLivro(livro1.id, novosDados);
    livrosDepois = biblioteca.buscarLivroPorId(livro1.id);
    expect(livrosDepois.autor).toBe("Autor 3");
    expect(livrosDepois.ano).toBe(2022);
    expect(Object.is(livroAntes, livrosDepois)).toBe(false);
  });
});
