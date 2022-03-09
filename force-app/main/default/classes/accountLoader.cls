public with sharing class accountLoader {
    
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountList(Integer lim, Integer offset)
    {
        return [SELECT Id, Name FROM Account LIMIT :lim OFFSET :offset];
    }

    @AuraEnabled(cacheable=true)
    public static List<Account> findAccounts(String filterString){
        List<List<Account>> result = [FIND :filterString IN ALL FIELDS RETURNING Account(Id,Name)];
        Account[] searchAccounts = (Account[])result[0];
        return searchAccounts;
    }

    @AuraEnabled
    public static Integer getTotalPages(){
        List<Account> allAccs = [SELECT Id FROM Account];
        return allAccs.size();
    }
}
