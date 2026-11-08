package harness;

/**
 * Same-length stand-in for java/lang/Runtime patched into the original class
 * files, so Runtime.getRuntime().getClass().getResourceAsStream(...) resolves
 * against the classpath instead of the java.base module.
 */
public final class RuntimeXX {
    private static final RuntimeXX INSTANCE = new RuntimeXX();

    public static RuntimeXX getRuntime() {
        return INSTANCE;
    }

    public long freeMemory() {
        return Runtime.getRuntime().freeMemory();
    }

    public long totalMemory() {
        return Runtime.getRuntime().totalMemory();
    }

    public void gc() {
    }
}
