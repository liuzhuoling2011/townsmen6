package javax.microedition.rms;

import harness.Host;
import java.util.ArrayList;
import java.util.List;

public class RecordStore {
    private final String name;
    private final List<byte[]> records;

    private RecordStore(String name, List<byte[]> records) {
        this.name = name;
        this.records = records;
    }

    public static RecordStore openRecordStore(String name, boolean create) throws RecordStoreException {
        List<byte[]> records = Host.stores.get(name);
        if (records == null) {
            if (!create) {
                throw new RecordStoreNotFoundException(name);
            }
            records = new ArrayList<>();
            Host.stores.put(name, records);
        }
        return new RecordStore(name, records);
    }

    public static void deleteRecordStore(String name) throws RecordStoreException {
        if (Host.stores.remove(name) == null) {
            throw new RecordStoreNotFoundException(name);
        }
    }

    public void closeRecordStore() {
    }

    public int getNumRecords() {
        int n = 0;
        for (byte[] r : records) {
            if (r != null) {
                n++;
            }
        }
        return n;
    }

    public int getSizeAvailable() {
        return 1 << 20;
    }

    public int addRecord(byte[] data, int offset, int length) {
        byte[] copy = new byte[length];
        System.arraycopy(data, offset, copy, 0, length);
        records.add(copy);
        Host.log("rms add " + name + " #" + records.size() + " " + length + " " + Host.crc(copy));
        return records.size();
    }

    public byte[] getRecord(int id) throws RecordStoreException {
        if (id < 1 || id > records.size() || records.get(id - 1) == null) {
            throw new InvalidRecordIDException();
        }
        return records.get(id - 1).clone();
    }

    public void setRecord(int id, byte[] data, int offset, int length) throws RecordStoreException {
        if (id < 1 || id > records.size() || records.get(id - 1) == null) {
            throw new InvalidRecordIDException();
        }
        byte[] copy = new byte[length];
        System.arraycopy(data, offset, copy, 0, length);
        records.set(id - 1, copy);
        Host.log("rms set " + name + " #" + id + " " + length + " " + Host.crc(copy));
    }

    public void deleteRecord(int id) throws RecordStoreException {
        if (id < 1 || id > records.size() || records.get(id - 1) == null) {
            throw new InvalidRecordIDException();
        }
        records.set(id - 1, null);
    }
}
