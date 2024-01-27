FROM golang:1.21.6

WORKDIR /app

COPY . .

# Download and install the dependencies:
RUN go get -d -v ./...

# Build the go app
RUN go build -o myproject .

EXPOSE 8000

CMD ["./myproject"]