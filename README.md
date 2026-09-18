# A Corrida dos Bairros

**O preço do metro quadrado, bairro por bairro, em 96 cidades brasileiras.**
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

## Cidades cobertas

96 cidades em 27 estados. Cada link abre a página da cidade, com o ranking dos bairros e a série mensal.

- **AC**: [Rio Branco](https://acorridadosbairros.com.br/ac/rio-branco/)
- **AL**: [Maceió](https://acorridadosbairros.com.br/al/maceio/)
- **AM**: [Manaus](https://acorridadosbairros.com.br/am/manaus/)
- **AP**: [Macapá](https://acorridadosbairros.com.br/ap/macapa/)
- **BA**: [Camaçari](https://acorridadosbairros.com.br/ba/camacari/), [Lauro de Freitas](https://acorridadosbairros.com.br/ba/lauro-de-freitas/), [Salvador](https://acorridadosbairros.com.br/ba/salvador/)
- **CE**: [Aquiraz](https://acorridadosbairros.com.br/ce/aquiraz/), [Caucaia](https://acorridadosbairros.com.br/ce/caucaia/), [Eusébio](https://acorridadosbairros.com.br/ce/eusebio/), [Fortaleza](https://acorridadosbairros.com.br/ce/fortaleza/)
- **DF**: [Brasília](https://acorridadosbairros.com.br/df/brasilia/)
- **ES**: [Serra](https://acorridadosbairros.com.br/es/serra/), [Vila Velha](https://acorridadosbairros.com.br/es/vila-velha/), [Vitória](https://acorridadosbairros.com.br/es/vitoria/)
- **GO**: [Aparecida de Goiânia](https://acorridadosbairros.com.br/go/aparecida-de-goiania/), [Goiânia](https://acorridadosbairros.com.br/go/goiania/)
- **MA**: [São Luís](https://acorridadosbairros.com.br/ma/sao-luis/)
- **MG**: [Belo Horizonte](https://acorridadosbairros.com.br/mg/belo-horizonte/), [Uberaba](https://acorridadosbairros.com.br/mg/uberaba/)
- **MS**: [Campo Grande](https://acorridadosbairros.com.br/ms/campo-grande/)
- **MT**: [Cuiabá](https://acorridadosbairros.com.br/mt/cuiaba/), [Várzea Grande](https://acorridadosbairros.com.br/mt/varzea-grande/)
- **PA**: [Belém](https://acorridadosbairros.com.br/pa/belem/)
- **PB**: [Cabedelo](https://acorridadosbairros.com.br/pb/cabedelo/), [João Pessoa](https://acorridadosbairros.com.br/pb/joao-pessoa/)
- **PE**: [Jaboatão dos Guararapes](https://acorridadosbairros.com.br/pe/jaboatao-dos-guararapes/), [Recife](https://acorridadosbairros.com.br/pe/recife/)
- **PI**: [Teresina](https://acorridadosbairros.com.br/pi/teresina/)
- **PR**: [Cascavel](https://acorridadosbairros.com.br/pr/cascavel/), [Curitiba](https://acorridadosbairros.com.br/pr/curitiba/), [Ponta Grossa](https://acorridadosbairros.com.br/pr/ponta-grossa/)
- **RJ**: [Belford Roxo](https://acorridadosbairros.com.br/rj/belford-roxo/), [Duque de Caxias](https://acorridadosbairros.com.br/rj/duque-de-caxias/), [Niterói](https://acorridadosbairros.com.br/rj/niteroi/), [Nova Iguaçu](https://acorridadosbairros.com.br/rj/nova-iguacu/), [Rio de Janeiro](https://acorridadosbairros.com.br/rj/rio-de-janeiro/), [São Gonçalo](https://acorridadosbairros.com.br/rj/sao-goncalo/)
- **RN**: [Natal](https://acorridadosbairros.com.br/rn/natal/), [Parnamirim](https://acorridadosbairros.com.br/rn/parnamirim/)
- **RO**: [Porto Velho](https://acorridadosbairros.com.br/ro/porto-velho/)
- **RR**: [Boa Vista](https://acorridadosbairros.com.br/rr/boa-vista/)
- **RS**: [Cachoeirinha](https://acorridadosbairros.com.br/rs/cachoeirinha/), [Canoas](https://acorridadosbairros.com.br/rs/canoas/), [Estância Velha](https://acorridadosbairros.com.br/rs/estancia-velha/), [Gravataí](https://acorridadosbairros.com.br/rs/gravatai/), [Novo Hamburgo](https://acorridadosbairros.com.br/rs/novo-hamburgo/), [Porto Alegre](https://acorridadosbairros.com.br/rs/porto-alegre/), [Viamão](https://acorridadosbairros.com.br/rs/viamao/)
- **SC**: [Araquari](https://acorridadosbairros.com.br/araquari/), [Balneário Camboriú](https://acorridadosbairros.com.br/balneario-camboriu/), [Balneário Piçarras](https://acorridadosbairros.com.br/balneario-picarras/), [Barra Velha](https://acorridadosbairros.com.br/barra-velha/), [Blumenau](https://acorridadosbairros.com.br/blumenau/), [Brusque](https://acorridadosbairros.com.br/brusque/), [Chapecó](https://acorridadosbairros.com.br/chapeco/), [Corupá](https://acorridadosbairros.com.br/corupa/), [Criciúma](https://acorridadosbairros.com.br/criciuma/), [Florianópolis](https://acorridadosbairros.com.br/florianopolis/), [Guabiruba](https://acorridadosbairros.com.br/guabiruba/), [Guaramirim](https://acorridadosbairros.com.br/guaramirim/), [Itajaí](https://acorridadosbairros.com.br/itajai/), [Itapema](https://acorridadosbairros.com.br/itapema/), [Itapoá](https://acorridadosbairros.com.br/itapoa/), [Joinville](https://acorridadosbairros.com.br/joinville/), [Lages](https://acorridadosbairros.com.br/lages/), [Massaranduba](https://acorridadosbairros.com.br/massaranduba/), [Navegantes](https://acorridadosbairros.com.br/navegantes/), [Palhoça](https://acorridadosbairros.com.br/palhoca/), [Penha](https://acorridadosbairros.com.br/penha/), [Pomerode](https://acorridadosbairros.com.br/pomerode/), [Porto Belo](https://acorridadosbairros.com.br/porto-belo/), [Schroeder](https://acorridadosbairros.com.br/schroeder/), [São Bento do Sul](https://acorridadosbairros.com.br/sao-bento-do-sul/), [São Francisco do Sul](https://acorridadosbairros.com.br/sao-francisco-do-sul/), [São José](https://acorridadosbairros.com.br/sao-jose/)
- **SE**: [Aracaju](https://acorridadosbairros.com.br/se/aracaju/), [Barra dos Coqueiros](https://acorridadosbairros.com.br/se/barra-dos-coqueiros/)
- **SP**: [Atibaia](https://acorridadosbairros.com.br/sp/atibaia/), [Campinas](https://acorridadosbairros.com.br/sp/campinas/), [Caçapava](https://acorridadosbairros.com.br/sp/cacapava/), [Guarulhos](https://acorridadosbairros.com.br/sp/guarulhos/), [Jacareí](https://acorridadosbairros.com.br/sp/jacarei/), [Jundiaí](https://acorridadosbairros.com.br/sp/jundiai/), [Limeira](https://acorridadosbairros.com.br/sp/limeira/), [Mirassol](https://acorridadosbairros.com.br/sp/mirassol/), [Piracicaba](https://acorridadosbairros.com.br/sp/piracicaba/), [Santo André](https://acorridadosbairros.com.br/sp/santo-andre/), [Santos](https://acorridadosbairros.com.br/sp/santos/), [São Bernardo do Campo](https://acorridadosbairros.com.br/sp/sao-bernardo-do-campo/), [São Caetano do Sul](https://acorridadosbairros.com.br/sp/sao-caetano-do-sul/), [São José do Rio Preto](https://acorridadosbairros.com.br/sp/sao-jose-do-rio-preto/), [São José dos Campos](https://acorridadosbairros.com.br/sp/sao-jose-dos-campos/), [São Paulo](https://acorridadosbairros.com.br/sp/sao-paulo/), [Ubatuba](https://acorridadosbairros.com.br/sp/ubatuba/)
- **TO**: [Palmas](https://acorridadosbairros.com.br/to/palmas/)

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
