from flaskapp import app

def main():
    try:
        app.run(host="0.0.0.0", port=8000, debug=True)
    except Exception as e:
        print(e)
        exit(1)

if __name__ == "__main__":
    main()