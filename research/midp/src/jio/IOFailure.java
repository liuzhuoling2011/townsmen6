package jio;

/** Unchecked stand-in for java.io.IOException in the prepared game source. */
public class IOFailure extends RuntimeException {
    public IOFailure(Throwable cause) {
        super(cause.getMessage(), cause);
    }
}
