# Estágio de construção (builder)
FROM golang:1.21-alpine as builder

WORKDIR /app
COPY . .

RUN go mod init gsping
RUN go build -o gsping .

# Estágio final
FROM alpine:latest

WORKDIR /app
COPY --from=builder /app/gsping .

EXPOSE 8080
CMD ["./gsping"]
