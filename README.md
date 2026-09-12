# A Corrida dos Bairros

**O preço do metro quadrado, bairro por bairro, em 67 cidades brasileiras.**
Site: **https://acorridadosbairros.com.br**

Projeto de jornalismo de dados do [Minuto Jaraguá](https://www.instagram.com/minutojaragua/).
Todo mês apuramos a mediana do preço do m² de venda e de aluguel em cada bairro,
a partir de anúncios públicos de centenas de fontes, deduplicados entre portais e
imobiliárias. Os números só mudam no dia 01 de cada mês, e a edição fica congelada
até lá, para que ninguém encontre um valor diferente a cada visita.

## O que tem no índice

| camada | o que é | onde |
|---|---|---|
| Cidade | mediana por tipo de imóvel, ranking dos bairros, série mês a mês | `https://acorridadosbairros.com.br/<cidade>/` |
| Bairro | mediana, posição no ranking, aluguel, rendimento bruto, faixas de metragem | `https://acorridadosbairros.com.br/<cidade>/bairro/<bairro>.html` |
| Comparador | dois ou mais bairros ou cidades lado a lado | [/comparar/](https://acorridadosbairros.com.br/comparar/) |
| Calculadora | estimativa do valor de um imóvel pela curva do próprio bairro | [/calculadora/](https://acorridadosbairros.com.br/calculadora/) |
| Onde cabe | o que o seu dinheiro compra, ou o seu aluguel paga, em cada bairro | [/onde-cabe/](https://acorridadosbairros.com.br/onde-cabe/) |
| Metodologia | como o número é apurado, com os filtros e os limites | [/metodologia/](https://acorridadosbairros.com.br/metodologia/) |

Tipos cobertos: apartamento, casa, terreno, sala comercial e galpão, em venda e em aluguel.

## Para máquinas

- **Dados abertos**, licença [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Cite "A Corrida dos Bairros" com link.
- [`/llms.txt`](https://acorridadosbairros.com.br/llms.txt): índice curto das cidades.
- [`/llms-full.txt`](https://acorridadosbairros.com.br/llms-full.txt): a base inteira em texto, bairro por bairro.
- [`/sitemap.xml`](https://acorridadosbairros.com.br/sitemap.xml): todas as páginas do índice.
- [`/historico/`](https://acorridadosbairros.com.br/historico/): a série histórica em CSV.
- Cada página traz JSON-LD `Dataset`, `Place`, `FAQPage` e `BreadcrumbList`.
- Servidor **MCP** público em `https://mcp.metroquadrado.workers.dev/mcp`, descrito em [/conector/](https://acorridadosbairros.com.br/conector/).

## Como o número é apurado

1. Coleta diária de anúncios públicos, por coletor próprio para cada plataforma de site imobiliário.
2. Deduplicação entre fontes pela referência do imóvel e pelo par preço e área.
3. Filtro de área e de preço por m² por tipo de imóvel, que descarta o anúncio implausível.
4. Mediana por bairro, publicada apenas com dez ou mais anúncios naquele recorte.
5. Congelamento no dia 01. Correção posterior sai como errata datada na página da cidade.

Os detalhes, os limites conhecidos e o que o índice **não** é estão em
[/metodologia/](https://acorridadosbairros.com.br/metodologia/).

## Licença

Dados sob [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
Ao republicar, cite **A Corrida dos Bairros, do Minuto Jaraguá**, com link para
https://acorridadosbairros.com.br.
