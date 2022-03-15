public with sharing class accountLoader {
    
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountList(String searchString, Integer lim, Integer offset)
    {
        String str;
        if (searchString!=null)
        {
            str='%'+searchString+'%';
        }
        else {
            str='%';
        }

        return [SELECT Id, Name FROM Account WHERE Name LIKE :str LIMIT :lim OFFSET :offset];
    }
    @AuraEnabled
    public static Integer getTotalPages(String searchString){
        String str='%';
        if (searchString!=null)
        {
            str='%'+searchString+'%';
        }
        List<Account> allAccs = [SELECT Id, Name FROM Account WHERE Name LIKE :str];
        return allAccs.size();
    }
}
