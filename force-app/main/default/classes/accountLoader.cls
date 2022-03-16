public with sharing class accountLoader {
    
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountList(String searchString, Integer lim, Integer offset)
    {
        String str='%';
        if (searchString!=null) {
            str='%'+searchString+'%';
        }
        return [SELECT Id, Name FROM Account WHERE Name LIKE :str LIMIT :lim OFFSET :offset];
    }
    @AuraEnabled
    public static Integer getTotalPages(String searchString){
        String str='%';
        if (searchString!=null) {
            str='%'+searchString+'%';
        }
        return [SELECT COUNT() FROM Account WHERE Name LIKE :str];
    }
    @AuraEnabled
    public static ResultWrapper getAccounts(String searchTerm, Integer pageNumber, Integer pageSize){
        searchTerm = searchTerm == null 
            ? '%'
            : '%' + searchTerm + '%';
        return new ResultWrapper(searchTerm, pageSize, (pageNumber-1) * pageSize);
    }
    
    public class ResultWrapper {
        @AuraEnabled 
        public List<Account> accounts;
        @AuraEnabled 
        public Integer totalAccounts;
        
        public ResultWrapper(String searchTerm, Integer queryLimit, Integer queryOffset) {
            this.accounts = [SELECT Id, Name FROM Account WHERE Name LIKE :searchTerm LIMIT :queryLimit OFFSET :queryOffset];
            this.totalAccounts = [SELECT COUNT() FROM Account WHERE Name LIKE :searchTerm LIMIT 2000];
        }
    }
}
