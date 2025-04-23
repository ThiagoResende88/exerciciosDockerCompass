
# Exercício 6 - Multi-stage Build para Aplicação Go

## Objetivo
Implementar uma construção multi-stage para uma aplicação Go (GS PING), reduzindo significativamente o tamanho da imagem Docker final e eliminando dependências desnecessárias.

---

## Tecnologias Utilizadas
- Docker
- Linguagem Go
- Alpine Linux (para imagem otimizada)

---

## Passo a Passo

### 1. Preparação do Ambiente
Crie a estrutura de arquivos:
```
ex6/
├── main.go
└── Dockerfile
```

### 2. Código da Aplicação (`main.go`)
```go
package main

import (
	"fmt"
	"net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "GS PING - Multi-stage Build Funcionando!")
}

func main() {
	http.HandleFunc("/", handler)
	http.ListenAndServe(":8080", nil)
}
```

### 3. Dockerfile Multi-stage

# Estágio 1: Construção
```
FROM golang:1.21-alpine AS builder
WORKDIR /app
COPY . .
RUN go build -o gsping .
```

# Estágio 2: Imagem Final
```
FROM alpine:latest
WORKDIR /app
COPY --from=builder /app/gsping .
EXPOSE 8080
CMD ["./gsping"]
```

### 4. Processo de Build e Execução

# Construir a imagem
```
docker build -t gsping-multi-stage .
```

# Verificar tamanho da imagem
```
docker images | grep gsping-multi-stage
```

# Executar o container
```
docker run -d -p 8080:8080 --name gsping-container gsping-multi-stage
```

# Testar a aplicação
```
curl http://localhost:8080
```

---

## Análise de Resultados

### Comparação de Tamanhos
```
| Tipo de Build           | Tamanho  |
|-------------------------|----------|
| Build tradicional       | ~350MB   |
| Multi-stage build       | ~12MB    |
```
**Redução de 96% no tamanho da imagem**

### Verificação do Funcionamento
```bash
$ curl http://localhost:8080
GS PING - Multi-stage Build Funcionando!
```

---

## Comandos Importantes
```
| Comando                            | Descrição              |
|------------------------------------|------------------------|
| `docker build -t <nome> .`         | Constroi a imagem      |
| `docker images`                    | Lista imagens com seus tamanhos |
| `docker run -p 8080:8080 <imagem>` | Executa o container    |
| `docker exec -it <container> sh`   | Inspeciona o container |
```
---

## Estrutura do Projeto
```
exerciciosDockerCompass/
└── ex6/
    ├── main.go
    ├── Dockerfile
    └── README.md
```

---

## Dificuldades e Soluções
1. **Problema**: Binário não executável no Alpine  
   **Solução**: Adicionar `RUN chmod +x gsping` no Dockerfile

2. **Problema**: Porta não acessível  
   **Solução**: Verificar se o firewall permite a porta 8080

3. **Problema**: Tamanho da imagem não reduz o suficiente  
   **Solução**: Usar `docker-slim` para otimização adicional

---

## Melhores Práticas Aplicadas

✔️ Separação clara entre ambiente de build e runtime  
✔️ Uso de imagens Alpine para minimizar tamanho  
✔️ Remoção automática de dependências de build  
✔️ Exposição explícita da porta da aplicação  

---

## Referências
- [Documentação Oficial Docker - Multi-stage](https://docs.docker.com/build/building/multi-stage/)
- [Best Practices for Dockerfiles](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)

---
